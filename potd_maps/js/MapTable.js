const gZoomStyleSheet = new CSSStyleSheet();

function OnLoad()
{
	let savedSize = localStorage.getItem( 'deep-dungeon.potd.maps.thumbnail-size-vw' );
	if( savedSize === null ) savedSize = 16;

	document.adoptedStyleSheets.push(gZoomStyleSheet);
	SetImageSize_vw( savedSize );
}

function SetImageSize_vw( size_vw )
{
	gZoomStyleSheet.replaceSync( 'img{ max-width: ' + size_vw + 'vw; max-height: '+ size_vw + 'vw; }' );
	localStorage.setItem( 'deep-dungeon.potd.maps.thumbnail-size-vw', size_vw )
}
