// IMPORTS
// ============================================================================
const express = require('express');
const pjson = require('./package.json');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const fs = require('fs');
const port = process.env.PORT || 3000;
const debug = require('debug')('kodebase');

// SERVER
// ============================================================================
const app = express();

// CONFIG
// ============================================================================
app.set('views', 'views');           // In which directory are views located
app.set('view engine', 'ejs');       // Which view engine to use
app.use(express.static('./public')); // Where are static files located

app.use(bodyParser.json());          // Accept JSON objects in requests
// Accept extended form elements in requests
app.use(bodyParser.urlencoded({
	'extended': true
}));

// Setup session handling
app.use(session({
	'resave': false,
	'saveUninitialized': true,
	'secret': 'really secret stuffs'
}));

app.use(logger('dev'));						// Setup console logging of route events

// Setup database connection
const db = mysql.createPool({
	'connectionLimit': 10,
	'host': process.env.DB_HOST,
	'user': process.env.DB_USER,
	'password': process.env.DB_PSWD,
	'database': process.env.DB_DTBS
});

// ROUTES
// ============================================================================
app.get('/', (req, res) => {
	db.query(`SELECT products.id, products.name, products.image, products.price
				FROM hifi.products
				ORDER BY RAND() LIMIT 6 `, (err, results) => {
			if (err) res.send(err);
			res.render('page', { 'title': 'HIFI-klubben byder dig velkommen!', 'content': 'Hos os finder du alt hvad hjertet begærer inden for HIFI.', 'title': 'Produkter', 'results': results });
	})
});

app.get('/produkter', (req, res) => {
	db.query(`SELECT products.id, products.name, products.image, products.price
				FROM hifi.products`, (err, results) => {
			if (err) res.send(err);
			res.render('products', { 'title': 'Produkter', 'results': results });
	})
});

app.get('/produkter/:id', (req, res) => {
	db.query(`SELECT products.name, products.image, products.price, products.description, categories.name AS category_name, brands.name AS brand_name
				FROM hifi.products
				INNER JOIN hifi.categories ON products.category = categories.id 
				INNER JOIN hifi.brands ON products.brand = brands.id
				WHERE products.id = ?`, [req.params.id], (err, results) => {
			if (err) res.send(err);
			res.render('product', { 'title': 'Produkt', 'results': results[0] });
	})
});

app.get('/produkter/kategori/:category', (req, res) => {
	db.query(`SELECT products.id AS product_id, products.name, products.image, products.price, products.category, categories.id
		FROM hifi.products
		INNER JOIN hifi.categories ON products.category = categories.id
		WHERE categories.name = ?`,[req.params.category], (err, results) => {
			if (err) res.send(err);
			res.render('category', { 'title': 'Produkter', 'results': results });
	})
});

app.get('/produkter/brand/:brand', (req, res) => {
	db.query(`SELECT products.id AS product_id, products.name, products.image, products.price, products.category, brands.id
		FROM hifi.products
		INNER JOIN hifi.brands ON products.brand = brands.id
		WHERE brands.name = ?`,[req.params.brand], (err, results) => {
			if (err) res.send(err);
			res.render('category', { 'title': 'Produkter', 'results': results });
	})
});

app.get('/soeg', (req, res) => {
	db.query(`SELECT products.id, products.name, products.image, products.price 
			FROM hifi.products 
			WHERE products.name LIKE ? OR products.description LIKE ?`, [`%${req.query.searchword}%`, `%${req.query.searchword}%`], function (err, results) {
		if (err) res.status(500);
		res.render('products', { 'title': 'Søgeresultater', 'results': results });
	});
});

app.get('/kontakt', (req, res) => {
	res.render('contact', { 'title': 'Kontakt', 'content': 'Send os en besked' });
});

app.post('/kontakt', (req, res) => {
	let succes = true;
	let errorMessage;
	let regexpNavn = /^[A-Za-z]+$/;
	let regexpBesked = /^[A-Za-zÆØÅæøå0-9-_., ]+$/;
	let regexpMail = /^[A-Za-zÆØÅæøå0-9_.]+[@]{1}[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

	if (req.body) {
		if (!req.body.navn || !regexpNavn.test(req.body.navn) || req.body.navn.length <= 1) {
			succes = false;
			errorMessage = 'Ugyldigt navn';
		}
		if (!req.body.email || !regexpMail.test(req.body.email)) {
			succes = false;
			errorMessage = 'Ugyldig Email';
		}
		if (!req.body.textmessage || !regexpBesked.test(req.body.textmessage) || req.body.textmessage.length <= 1) {
			succes = false;
			errorMessage = 'Ugyldig besked';
		}
	} else {
		succes = false;
		errorMessage = 'Alt er galt';
	}

	if (succes) {
		let message;
		fs.writeFile(`./public/message/${new Date().getTime()}.json`, JSON.stringify(req.body), (error) => {
			if (error) {
				message = `Noget gik galt: ${error}`;
			} else {
				message = 'Tak for din besked, vi vender tilbage hurtigst muligt';
			}
			res.render('confirmation', { 'title': 'Kontakt', 'content': message});
		});
	} else {
		res.render('contact', { ...req.body, 'title': 'Kontakt', 'content': 'FEJL', 'errorMessage': errorMessage});
	}
});
// ADMIN LOGIN
app.get('/login', (req, res) => {
	res.render('login', { 'title': 'Log in'});
});
 app.post('/login', (req, res) => {
	db.query(`SELECT id FROM hifi.users WHERE username = ? AND passphrase = ?`, [req.body.username, req.body.passphrase], (err, result) => {
		if (err) return res.send(err);
		if (result.length === 1) {
			req.session.user = result[0].id;
			res.redirect('/admin');
		} else {
			res.redirect('/login');
		}
	});
});
 app.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});
 app.use('/admin', (req, res, next) => {
	if (!req.session.user) {
		res.redirect('/login');
		return;
	} else {
		next();
	}
});
 app.get('/admin', (req, res) => {
	res.render('administration/admin', { 'title': 'Admin panel', 'content': 'Naviger i menuen' });
});
 app.get('/admin/products', (req, res) => {
	db.query(`SELECT products.id, products.name, products.price, products.image, products.description, brands.name AS brand_name, categories.name AS category_name
		FROM hifi.products
		INNER JOIN hifi.categories ON products.category = categories.id
		INNER JOIN hifi.brands ON products.brand = brands.id` , (err, results) => {
	if (err) res.send(err);
	res.render('administration/products', { 'title': 'Produkter', 'content': 'Rediger i produkter', 'results': results });
	})
});
app.post('/admin/products', function (req, res, next) {
	db.query(`INSERT INTO hifi.products (name, price, image, description, category, brand) VALUES (?, ?, ?, ?, ?, ?)`, 
	[req.body.name, req.body.price, req.body.image, req.body.description, req.body.category, req.body.brands], (err, results) => {
		if (err) {
			debug('error in create product');
			return next(err);
		}
		debug('product created');
		res.redirect('/admin/products');
	})
});
app.delete('/admin/products/:id', (req, res, next) => {
	db.query(`DELETE FROM hifi.products WHERE id = ?`, [req.params.id], (err, results) => {
		if (err) return next(err);
		res.status(200);
		res.end();
	})
});
app.get('/admin/pages', (req, res) => {
	res.render('administration/pages', { 'title': 'Sider', 'content': 'Rediger i sider' });
});
app.get('/admin/brands', (req, res) => {
	db.query(`SELECT brands.name, brands.id
		FROM hifi.brands`, (err, results) => {
	if (err) res.send(err);
	res.render('administration/brands', { 'title': 'Producenter', 'content': 'Rediger i producenter', 'results': results });
	})
});
app.post('/admin/brands', (req, res) => {
	db.query(`INSERT INTO hifi.brands (name) VALUES (?)`, req.body.name, (err, results) => {
		if (err) res.send(err);
		res.redirect('/admin/brands');
	})
});
app.get('/api/brands', (req, res) => {
	db.query(`SELECT brands.name, brands.id
		FROM hifi.brands`, (err, results) => {
	if (err) res.send(err);
	res.json(results);
	})
});
app.delete('/admin/brands/:id', (req, res, next) => {
	db.query(`DELETE FROM hifi.brands WHERE id = ?`, [req.params.id], (err, results) => {
		if (err) return next(err);
		res.status(200);
		res.end();
	})
});
app.get('/admin/categories', (req, res) => {
	db.query(`SELECT categories.name, categories.id
		FROM hifi.categories`, (err, results) => {
	if (err) res.send(err);
	res.render('administration/categories', { 'title': 'Kategorier', 'content': 'Rediger i kategorier', 'results': results });
	})
});
app.post('/admin/categories', (req, res) => {
	db.query(`INSERT INTO hifi.categories (name) VALUES (?)`, req.body.name, (err, results) => {
		if (err) res.send(err);
		res.redirect('/admin/categories');
	})
});
app.get('/api/categories', (req, res) => {
	db.query(`SELECT categories.name AS name, categories.id AS id
		FROM hifi.categories`, (err, results) => {
	if (err) res.send(err);
	res.json(results);
	})
});
app.delete('/admin/categories/:id', (req, res, next) => {
	db.query(`DELETE FROM hifi.categories WHERE id = ?`, [req.params.id], (err, results) => {
		if (err) return next(err);
		res.status(200);
		res.end();
	})
});
app.get('/admin/users', (req, res) => {
	db.query(`SELECT users.username, users.id
		FROM hifi.users`, (err, results) => {
	if (err) res.send(err);
	res.render('administration/users', { 'title': 'Brugere', 'content': 'Rediger i brugere', 'results': results });
	})
});
app.post('/admin/users', (req, res) => {
	db.query(`INSERT INTO hifi.users (username, passphrase) VALUES (?, ?)`, [req.body.username, req.body.passphrase], (err, results) => {
		if (err) res.send(err);
		res.redirect('/admin/users');
	})
});
app.delete('/admin/users/:id', (req, res, next) => {
	db.query(`DELETE FROM hifi.users WHERE id = ?`, [req.params.id], (err, results) => {
		if (err) return next(err);
		res.status(200);
		res.end();
	})
});
// ERROR ROUTES
app.use((req, res) => {
	res.status(404);
	res.render('error', { 'title': '404: Not Found', 'content': 'The page you are looking for does not exist. FAT DET!' });
});

app.use((error, req, res, next) => {
	res.status(500);
	res.render('error', { 'title': '500: Internal Server Error', 'content': error });
});

// SERVER INIT
// ============================================================================
app.listen(port, () => {
	debug(
		`${pjson.name} v${pjson.version} is running on http://${process.env.SITE_HOST}:${port}`
	);
});