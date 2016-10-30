
const concerto = require( './bin/index.js' )
const regulex = require( 'regulex' )

// testing the regex we already have:
let regulexAST
try {
    regulexAST = regulex.parse( '<span class="console-highlight-active-block">(.*)</span>' )
    console.log('--- Regulex AST --------------------------')
    console.log( regulexAST )
}
catch ( error ) {
    throw error
}

const xml = concerto.compile( regulexAST, true )

console.log( '--- Quartet File -------------------------' )

console.log( `{"workspaceXML":"${ xml }","playgroundText":""}` )
