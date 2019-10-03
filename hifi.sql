-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 12. 10 2018 kl. 09:24:40
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hifi`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `brands`
--

CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(12) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Creek'),
(2, 'Exposure'),
(3, 'Parasound'),
(4, 'Manley'),
(5, 'Pro_ject'),
(6, 'Boesendorfer'),
(7, 'Epos'),
(8, 'Harbeth'),
(9, 'Jolida');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(18) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'CD afspillere'),
(2, 'DVD afspillere'),
(3, 'Effektforstærkere'),
(4, 'Forforstærkere'),
(5, 'Højtalere'),
(6, 'Int. forstærkere'),
(7, 'Pladespillere'),
(8, 'Rørforstærkere');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `image` varchar(35) NOT NULL,
  `description` text NOT NULL,
  `category` int(11) NOT NULL,
  `brand` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `category`, `brand`) VALUES
(1, 'Creek classic CD', '1299.95', 'creek_classic_cd.jpg', 'En forbandet god investering, den bliver kun mere værd med tiden. CD''er er kommet for at blive, så alle burde have sig en CD-afspiller.', 1, 1),
(2, 'Creek destiny CD', '895.00', 'creek_Destiny_CD.jpg', 'En afspiller der er god til prisen, et must have. Vennerne bliver misundelige når de ser dette monster af en cd-afspiller.', 1, 1),
(3, 'Creek evo CD', '2599.00', 'creek_evo_cd.jpg', 'Den stilet CD-afspiller der kan spille en skive som den skal spilles. Selv de værste ridser kan den klare. Så den er alle pengene værd.', 1, 1),
(4, 'Exposure 2010S CD', '299.50', 'Exp_2010S_CD.jpg', 'Skal du have lommepengene op ad lommen alligevel, så skal det da være til denne lækre CD afspiller. Den sejeste elev i klassen skal da eje dette 8. vidunder.', 1, 2),
(5, 'Creek classic', '1875.00', 'creek_classic.jpg', 'Intet godt i TV? Smæk en DVD på dette lyn af en afspiller. Spol, hop til kapitel og sæt dine film på pause. Det har ALDRIG været nemmere.', 2, 1),
(6, 'Exposure 2010S', '569.95', 'exposure_2010S.jpg', 'Det sikrer valg! En fremtidssikret DVD afspiller, denne får du megen glæde af til langt ud på natten.', 2, 2),
(7, 'Parasound d200', '1900.00', 'parasound_d200.jpg', 'En allerhelvedes fabelagtig maskine, aldrig har det været nemmere at se dine yndlingsfilm i høj kvalitet.', 2, 3),
(8, 'Parasound halod 3', '775.00', 'parasound_halod3.jpg', 'En stor men magtfuld maskine. Den har de fleste funktioner, og kan give selv den mest kræsne bruger sved på panden.', 2, 3),
(9, 'Manley Mahi', '1599.00', 'manley_mahi.jpg', 'Effektforstærker for alle pengene! Den pumper din musik ud som aldrig før, så du kan danse i flere timer i streg på MAX volume.', 3, 4),
(10, 'Manley Neoclassic300b', '1300.00', 'manley_neoclassic300b.jpg', 'Skal der pumpes rytmer ud af spilleboksen, så er dette et godt valg! Lars Ulrich kan ikke engang ødelægge det for dig.', 3, 4),
(11, 'Manley Snapper', '4599.00', 'manley_snapper.jpg', 'Lynende effektiv, giver dig helt skarp lyd og en følelse af evigt liv.', 3, 4),
(12, 'Parasound Haloa 23', '265.00', 'parasound_haloa23.jpg', 'Den billige effektforstærker som de fleste har råd til. Den gør hvad den skal, og du vil blive glad for den i længden.', 3, 3),
(13, 'Creek OBH 22 Passive Prea', '999.99', 'Creek_OBH_22_Passive_Preamp.jpg', 'En forforstærker der kan hjælpe dig på vej til et bedre liv. Køb Køb Køb.', 4, 1),
(14, 'Parasound Classic 7100', '1600.00', 'parasound_classic7100.jpg', 'En stor og god forforstærker til den der vil have det bedste. Du får alt det nye teknologi mast ind i dette vidunder.', 4, 3),
(15, 'Parasound Halop 3 ', '599.00', 'parasound_halop3.jpg', 'En standard forforstærker til en god pris. Valgt af HIFI-klubben som årets overraskelse 2007', 4, 3),
(16, 'Project Prebox', '755.00', 'Project_prebox.jpg', 'En lille forforstærker med et kraftfuld moment. Er pladsen snæver, så er dette en god model at overveje.', 4, 5),
(17, 'Boesendorfer VCS wall', '7999.00', 'boesendorfer_vcs_wall.jpg', 'En dyr men flot og kvalitetsbevidst beslutning. Disse højtalere er både en smuk sag at have hængende, men mindst lige så smuk sag at lytte til.', 5, 6),
(18, 'Epos m5', '899.50', 'epos_m5.jpg', 'De gule højtalere er alles drøm, de spiller godt og skiller sig ud med den flotte karrygule farve.', 5, 7),
(19, 'Harbeth HL7es2', '1965.99', 'harbeth_hl7es2.jpg', 'En god højtalere du ikke bliver skuffet over! den kan nemt spille hele huset op til dans!', 5, 8),
(20, 'Harbeth Monitor 30', '5399.00', 'harbeth_monitor30.jpg', 'En af de mest kraftfulde højtalere på markedet, glæd dine ører med dine melodier som flyder ud af denne kasse af vidunderlig teknik.', 5, 8),
(21, 'Harbeth P3es2', '1700.00', 'harbeth_p3es2.jpg', 'Gode højtalere til en fornuftig pris!', 5, 8),
(22, 'Creek A50I', '299.00', 'creek_a50I.jpg', 'En jævn god forstærker i forhold til prisen.', 6, 1),
(23, 'Creek Classic 5350SE', '1429.00', 'creek_classic5350SE.jpg', 'Forstærk, forstærk, forstærk! Så skal der forstærkes.', 6, 1),
(24, 'Creek Destinyamp', '5699.00', 'creek_destinyamp.jpg', 'Den bedste forstærker fra Creek, den kan rive de fleste jævne højtalere fra hinanden.', 6, 1),
(25, 'Manley Snapper', '10999.00', 'manley_snapper_ror.jpg', 'En forstærker til samleren eller den seriøse. AFSTED!', 6, 4),
(26, 'Manley Stingray', '16599.00', 'Manley_Stingray.jpg', 'Det bedste af det bedste, lad ikke dette tilbud løbe fra dig!', 6, 4),
(27, 'Pro_ject Debut 3 bl', '1099.95', 'Pro_ject_Debut_3_bl.jpg', 'Flot pladeafspiller i blå. Afspil dine forældres gamler plader på denne fine pladespiller fra Pro_ject.', 7, 5),
(28, 'Pro_ject Debut III red 1', '1299.95', 'Pro_ject_Debut_III_red_1.jpg', 'Flot pladeafspiller i rød. Afspil dine forældres gamler plader på denne fine pladespiller fra Pro_ject.', 7, 5),
(29, 'Pro_ject Debut III yellow', '1299.00', 'Pro_ject_Debut_III_yellow_1.jpg', 'Flot pladeafspiller i gul. Afspil dine forældres gamler plader på denne fine pladespiller fra Pro_ject.', 7, 5),
(30, 'Pro_ject rpm 5', '899.00', 'Pro_ject_rpm_5.jpg', 'Flot pladeafspille. Afspil dine forældres gamler plader på denne fine pladespiller fra Pro_ject. Igen og igen!', 7, 5),
(31, 'Pro_ject rpm 10', '1799.00', 'Pro_ject_rpm10.jpg', 'Lækker pladeafspiller. Afspil dine forældres gamler plader på denne fine pladespiller fra Pro_ject.', 7, 5),
(32, 'Jolida JD102b', '22175.95', 'jolida_JD102b.jpg', 'En rør forstærker der vil dig alt det bedste! Læn dig tilbage og bliv blæst langt ned i stolen!', 8, 9),
(33, 'Jolida JD202a', '28000.00', 'jolida_JD202a.jpg', 'En rør forstærker der kan alt det bedste! Læn dig tilbage og bliv blæst langt ned i stolen!', 8, 9),
(34, 'Jolida JD300b', '25645.50', 'jolida_JD300b.jpg', 'En rør forstærker der vil dig alt det bedste! Læn dig tilbage og bliv blæst langt ned i stolen! fra en kant af!', 8, 9),
(35, 'Jolida JD302b', '15499.00', 'jolida_JD302b.jpg', 'Skal der smæk på? Ja vel skal der så, og det kommer der med denne rørforstærker!', 8, 9),
(36, 'Jolida JD502b', '63500.00', 'jolida_JD502b.jpg', 'Skal der smæk på? Ja vel skal der så, og det kommer der med denne rørforstærker!', 8, 9);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- Tilføj AUTO_INCREMENT i tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Tilføj AUTO_INCREMENT i tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
