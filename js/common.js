//	Helper while debugging.
async function DEBUG_Sleep( time_ms )
{
	return new Promise( whatever => setTimeout( whatever, time_ms ) ).then( () => console.debug( 'Finished waiting ' + time_ms + ' ms.' ));
}

//	Fetch, validate, and parse an external JSON data file.
async function FetchAndParseJSON( filePath )
{
	var result;

	await fetch( filePath )
	.then
	(
		response => ValidateFetchResponseAndGetText( response, filePath ),
		error => ThrowFetchError( error, filePath )
	)
	.then( ( data ) =>
	{
		result = JSON.parse( data );
	});

	return result;
}

//	Fetch, validate, and return text from an external file.
async function FetchText( filePath )
{
	var result;

	await fetch( filePath )
	.then
	(
		response => ValidateFetchResponseAndGetText( response, filePath ),
		error => ThrowFetchError( error, filePath )
	)
	.then( ( data ) =>
	{
		result = data;
	});

	return result;
}

//	Fetch response validation.
function ValidateFetchResponseAndGetText( response, filePath )
{
	if( !response.ok ) throw new Error( 'Error while fetching data from "' + filePath + '": ' + response.status + ' (' + response.statusText + ')' );
	return response.text();
}

//	Fetch promise response error handler.
function ThrowFetchError( error, filePath )
{
	throw new Error( 'Error while fetching data from "' + filePath + '": ' + error );
}
