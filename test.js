
const concerto = require( './bin/index.js' )
const regulex = require( 'regulex' )
const fs = require( 'fs' )
const path = require( 'path' )

function getDesktop ( ) {
    return path.join( ( process.env.HOME || process.env.USERPROFILE ), 'Desktop' )
}

// testing the regex we already have:
let regulexAST
try {
    regulexAST = regulex.parse( '((?:let|var|const)) +(?:([a-zA-Z_][0-9a-zA-Z_]+)|\{[ \t]*([a-zA-Z_][0-9a-zA-Z_]+)[ \t]*(?:,[ \t]*([a-zA-Z_][0-9a-zA-Z_]+)[ \t])*\}) *[,;\=]' )
    //console.log( '--- Regulex AST --------------------------' )
    //console.log( regulexAST )
}
catch ( error ) {
    throw error
}

const xml = concerto.compile( regulexAST, false )

////console.log( '--- Quartet File -------------------------' )

//console.log( `{"workspaceXML":"${ xml }","playgroundText":""}` )

fs.writeFileSync(
    path.join( getDesktop( ), 'a.quartet' ), `{"workspaceXML":"${ xml }","playgroundText":""}`)

console.log('Test RegExp compiled and saved as "a.quartet" on desktop.')