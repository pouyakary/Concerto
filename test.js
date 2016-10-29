
const concerto = require( './bin/index.js' )

// testing the regex we already have:
let regulexAST
try {
    regulexAST = regulex.parse( 'a(?!b)\\b' )
}
catch ( error ) {
    throw error
}

if ( debug ) {
    console.log('--- Regulex AST --------------------------')
    console.log( regulexAST )
}

const xml = concerto.compile( regulexAST, true )

console.log( '--- Quartet File -------------------------' )

console.log( `{"workspaceXML":"${ xml }","playgroundText":""}` )
