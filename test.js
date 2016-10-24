
const concerto = require( './bin/index.js' )

const xml = concerto.compile( 'a\\wb', true )

console.log( '--- Quartet File -------------------------' )
console.log( `{"workspaceXML":"${ xml }","playgroundText":""}` )

