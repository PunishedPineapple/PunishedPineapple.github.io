var gMapContainer;
var gCarrotCoords = [[180,987],[180,987],[217,1912],[217,1912],[252,330],[280,1108],[296,1353],[296,1353],[314,572],[314,572],[322,1743],[322,1743],[448,1693],[470,658],[534,283],[585,1208],[585,1208],[623,506],[623,506],[751,1874],[850,1132],[939,228],[1273,1815],[1308,1611],[1308,1611],[1308,1611],[1490,1587],[1490,1587],[1490,1587],[1501,1163],[1501,1163],[1674,1165],[1674,1165],[1744,1295],[1796,1555],[1851,868],[1851,868],[1851,868],[1870,1801],[1889,809],[1889,809]];

function OnLoad()
{
	gMapContainer = document.getElementById( 'MapCanvasContainer' );
	
	SetupDefaults();
	
	SetupGeneralCheckboxes();
	
	SetupEnemyCheckboxes();
}

function OnCheckChanged( checkbox )
{
	if( checkbox.id == 'BronzeCofferCheckbox' )
	{
		if( checkbox.checked ) AddBronzeCoffers();
		else RemoveBronzeCoffers();
		
		localStorage.setItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBronzeCoffers", checkbox.checked.toString() );
	}
	else if( checkbox.id == 'SilverCofferCheckbox' )
	{
		if( checkbox.checked ) AddSilverCoffers();
		else RemoveSilverCoffers();
		
		localStorage.setItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowSilverCoffers", checkbox.checked.toString() );
	}
	else if( checkbox.id == 'ImpCofferCheckbox' )
	{
		if( checkbox.checked ) AddImpCoffers();
		else RemoveImpCoffers();
		
		localStorage.setItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowImpCoffers", checkbox.checked.toString() );
	}
	else if( checkbox.id == 'CarrotCheckbox' )
	{
		if( checkbox.checked ) AddCarrots();
		else RemoveCarrots();
		
		localStorage.setItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowCarrots", checkbox.checked.toString() );
	}
}

//	Create default settings in local storage if nothing has been saved.
function SetupDefaults()
{
	if( localStorage.getItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBronzeCoffers" ) === null )
	{
		localStorage.setItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBronzeCoffers", "true" )
	}
	if( localStorage.getItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowSilverCoffers" ) === null )
	{
		localStorage.setItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowSilverCoffers", "true" )
	}
	if( localStorage.getItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowImpCoffers" ) === null )
	{
		localStorage.setItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowImpCoffers", "false" )
	}
	if( localStorage.getItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowCarrots" ) === null )
	{
		localStorage.setItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowCarrots", "true" )
	}
}

function SetupGeneralCheckboxes()
{
	var showBronzeCoffers = localStorage.getItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowBronzeCoffers" ) === "true";
	var showSilverCoffers = localStorage.getItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowSilverCoffers" ) === "true";
	var showImpCoffers = localStorage.getItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowImpCoffers" ) === "true";
	var showCarrots = localStorage.getItem( "field_exploration.occult_crescent.south_horn.InteractiveMap.CheckboxState.ShowCarrots" ) === "true";
	
	var bronzeCofferCheckbox = document.getElementById( 'BronzeCofferCheckbox' );
	var silverCofferCheckbox = document.getElementById( 'SilverCofferCheckbox' );
	var impCofferCheckbox = document.getElementById( 'ImpCofferCheckbox' );
	var carrotCheckbox = document.getElementById( 'CarrotCheckbox' );
	
	bronzeCofferCheckbox.checked = showBronzeCoffers;
	silverCofferCheckbox.checked = showSilverCoffers;
	impCofferCheckbox.checked = showImpCoffers;
	carrotCheckbox.checked = showCarrots;
	
	if( showBronzeCoffers ) OnCheckChanged( bronzeCofferCheckbox );
	if( showSilverCoffers ) OnCheckChanged( silverCofferCheckbox );
	if( showImpCoffers ) OnCheckChanged( impCofferCheckbox );
	if( showCarrots ) OnCheckChanged( carrotCheckbox );
}

function SetupEnemyCheckboxes()
{
	
}

function AddMarkerIcon( icon, markerClass, x_Pct, y_Pct )
{
	var marker = document.createElement( 'div' );
	marker.classList.add( 'map-marker' );
	marker.classList.add( markerClass );
	marker.setAttribute( 'style', 'left: ' + x_Pct + '%; top: ' + y_Pct + '%' );
	
	marker.appendChild( icon );
	gMapContainer.appendChild( marker );
}

function SetupIcon( imagePath, tooltip )
{
	var icon = document.createElement( 'img' );
	icon.setAttribute( 'src', imagePath );
	icon.setAttribute( 'title', tooltip );
	return icon;
}

function AddBronzeCoffers()
{
	var icon = SetupIcon( 'images/060911_hr1.png', 'test tooltip' );
	AddMarkerIcon( icon, 'bronze-coffer-marker', 50, 50 );
}

function AddSilverCoffers()
{
	var icon = SetupIcon( 'images/060912_hr1.png', 'test tooltip' );
	AddMarkerIcon( icon, 'silver-coffer-marker', 60.2, 60.2 );
}

function AddImpCoffers()
{
	var icon = SetupIcon( 'images/060913_hr1.png', 'test tooltip' );
	AddMarkerIcon( icon, 'imp-coffer-marker', 70, 70 );
}

function AddCarrots()
{
	gCarrotCoords.forEach( e =>
	{
		var percentCoords = PixelCoordsToPercentCoords( e );
		var mapCoords = PixelCoordsToMapCoords( e );
		var icon = SetupIcon( 'images/025207_hr1_nobg_scaled.png', FormatMapCoordString( mapCoords ) );
		AddMarkerIcon( icon, 'carrot-marker', percentCoords[0], percentCoords[1] );
	} );
}

function AddEnemies( bNpcDataIndex )
{
	//var icon = SetupIcon( 'images/060911_hr1.png', 'test tooltip' );
	//AddMarkerIcon( icon, 'bronze-coffer-marker', 50, 50 );
}

function RemoveBronzeCoffers()
{
	document.querySelectorAll( '.bronze-coffer-marker' ).forEach( e => e.remove() );
}

function RemoveSilverCoffers()
{
	document.querySelectorAll( '.silver-coffer-marker' ).forEach( e => e.remove() );
}

function RemoveImpCoffers()
{
	document.querySelectorAll( '.imp-coffer-marker' ).forEach( e => e.remove() );
}

function RemoveCarrots()
{
	document.querySelectorAll( '.carrot-marker' ).forEach( e => e.remove() );
}

function RemoveEnemies( bNpcDataIndex )
{
	
}

function GameCoordsToPixelCoords( gameCoords, sizeFactor, offset )
{
	var pixelX = ( gameCoords[0] + offset[0] ) / 100.0 * sizeFactor + 1024.0;
	var pixelY = ( gameCoords[2] + offset[1] ) / 100.0 * sizeFactor + 1024.0;
	
	return [pixelX, pixelY];
}

function PixelCoordsToPercentCoords( pixelCoords )
{
	var percentX = pixelCoords[0] / 20.48;
	var percentY = pixelCoords[1] / 20.48;
	
	return [percentX, percentY];
}

function PixelCoordsToMapCoords( pixelCoords )
{
	var mapX = pixelCoords[0] / 50.0 + 1.0;
	var mapY = pixelCoords[1] / 50.0 + 1.0;
	
	return [mapX, mapY];
}

function FormatMapCoordString( mapCoords )
{
	var truncatedX = Math.floor( mapCoords[0] * 10.0 ) / 10.0;
	var truncatedY = Math.floor( mapCoords[1] * 10.0 ) / 10.0;
	return 'X: ' + truncatedX.toFixed( 1 ) + ', Y: ' + truncatedY.toFixed( 1 );
}