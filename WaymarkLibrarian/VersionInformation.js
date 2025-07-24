//	Page load event handler.
async function OnLoad()
{
	const versionDataStatusElement = document.getElementById( 'AggroDataVersionText' );

	try
	{
		await PopulateVersionInformation();
		//versionDataStatusElement.classList.remove( 'loading-message' );
		versionDataStatusElement.remove();
	}
	catch( exception )
	{
		console.error( exception );
		versionDataStatusElement.className = 'error-text';
		versionDataStatusElement.innerText = 'Unable to load data: ' + exception.message;
	}
}

//	Populate the version table.
async function PopulateVersionInformation()
{
	const tableBody = document.getElementById( 'VersionDataTableBody' );
	const versionDataArray = [];

	//const basePath = 'https://punishedpineapple.github.io/WaymarkLibrarian/Support/';
	const basePath = './Support/';
	const filePath = basePath + 'CurrentVersions.dat'
	await FetchText( filePath )
	.then( ( allText ) =>
	{
		let fileLines = allText.split( /\r\n|\n/ );
		for( let i = 0; i < fileLines.length; i++ )
		{
			versionDataArray.push( fileLines[i].split( /=/ ) );
		}
	});

	for( let i = 0; i < versionDataArray.length; i++ )
	{
		const tr = tableBody.insertRow();
		for( let j = 0; j < versionDataArray[i].length; j++ )
		{
			const td = tr.insertCell();
			const text = document.createTextNode( `${versionDataArray[i][j]}` )
			if( j == 0 ) td.style.textAlign = 'left';
			td.appendChild( text );
		}
	}
}
