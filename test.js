
const concerto = require( './bin/index.js' )

const xml = concerto.compile( 'a(?!b)', true )

console.log( '--- Quartet File -------------------------' )

console.log( `{"workspaceXML":"${ xml }","playgroundText":""}` )
