//	Page load event handler.
async function OnLoad()
{
	const versionStringElement = document.getElementById( 'AggroDataVersionText' );

	try
	{
		await PopulateAggroDistanceTable();
		versionStringElement.classList.remove( 'loading-message' );
	}
	catch( exception )
	{
		console.error( exception );
		versionStringElement.className = 'error-text';
		versionStringElement.innerText = 'Unable to load data: ' + exception.message;
	}
}

//	Populate the aggro data table and version information.
async function PopulateAggroDistanceTable()
{
	const tableBody = document.getElementById( 'AggroDataTableBody' );
	const versionStringElement = document.getElementById( 'AggroDataVersionText' );
	const aggroDistanceDataArray = [];

	//const basePath = 'https://punishedpineapple.github.io/DalamudPlugins/Distance/Support/';
	const basePath = './';
	const filePath = basePath + 'AggroDistances.dat'
	await FetchText( filePath )
	.then( ( allText ) =>
	{
		let fileLines = allText.split( /\r\n|\n/ );
		let versionStr = "Unknown";
		if( fileLines.length > 0 )
		{
			let tokens = fileLines[0].split( /=/ );
			if( tokens.length > 0 ) versionStr = tokens[1].trim();
		}
		versionStringElement.innerText = 'Version: ' + versionStr;
		for( let i = 1; i < fileLines.length; i++ )
		{
			aggroDistanceDataArray.push( fileLines[i].split( /=/ ) );
		}
	});

	for( let i = 0; i < aggroDistanceDataArray.length; i++ )
	{
		const tr = tableBody.insertRow();
		for( let j = 0; j < aggroDistanceDataArray[i].length; j++ )
		{
			//	Get ignore any blank lines.
			if( aggroDistanceDataArray[i].length < 1 || aggroDistanceDataArray[i][0] == '' )
			{
				tr.remove();
				continue;
			}

			const td = tr.insertCell();
			if( j == 3 ) td.style.textAlign = 'left';
			td.appendChild( document.createTextNode( aggroDistanceDataArray[i][j] ) );
		}
	}
}
