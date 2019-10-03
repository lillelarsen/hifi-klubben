//Kalder scriptet når sitet er loadet
window.addEventListener( 'load', function()
{
	dropDown();
});
//Laver en løkke der finder ud af om der bliver trykket på infoboksen
function dropDown()
{
    for ( var i = 0; i < document.getElementsByClassName('categoryButton').length; i++ )
    {
    document.getElementsByClassName('categoryButton')[0].onclick = dropCategory;
    }

    for ( var i = 0; i < document.getElementsByClassName('brandButton').length; i++ )
    {
    document.getElementsByClassName('brandButton')[0].onclick = dropBrand;
    }
};

function dropCategory()
{
    if( document.getElementsByClassName('categoryItems')[0].style.display != "block" )
    {
        document.getElementsByClassName('categoryItems')[0].style.display = "block";
    }
    else
    {
        document.getElementsByClassName('categoryItems')[0].style.display = "none";
    }
};

function dropBrand()
{
    if( document.getElementsByClassName('brandItems')[0].style.display != "block" )
    {
        document.getElementsByClassName('brandItems')[0].style.display = "block";
    }
    else
    {
        document.getElementsByClassName('brandItems')[0].style.display = "none";
    }
};