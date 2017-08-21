
//
// ─── INCLUDES ───────────────────────────────────────────────────────────────────
//

    const concerto  = require( './bin/index.js' )
    const regulex   = require( 'regulex' )
    const fs        = require( 'fs' )
    const path      = require( 'path' )

//
// ─── TEST CASES ─────────────────────────────────────────────────────────────────
//

    // const testRegExp = /((?:let|var|const)) +(?:([a-zA-Z_][0-9a-zA-Z_]+)|\{[ \t]*([a-zA-Z_][0-9a-zA-Z_]+)[ \t]*(?:,[ \t]*([a-zA-Z_][0-9a-zA-Z_]+)[ \t])*\}) *[,;\=]/
    const testRegExp = /[\s0-9]/

//
// ─── GET DESKTOP ────────────────────────────────────────────────────────────────
//

    function getDesktop ( ) {
        return path.join( ( process.env.HOME || process.env.USERPROFILE ), 'Desktop' )
    }

//
// ─── AST ────────────────────────────────────────────────────────────────────────
//

    let regulexAST
    try {
        regulexAST = regulex.parse( testRegExp.source )
    }
    catch ( error ) {
        throw error
    }

//
// ─── XML ────────────────────────────────────────────────────────────────────────
//

    const blocklyXML = concerto.compile( regulexAST )

//
// ─── SAVING FILE ────────────────────────────────────────────────────────────────
//

    const orchestraFileString =
        `{"version":"1.0","workspaceXML":"${ blocklyXML }","playgroundText":""}`
    const pathToFile =
        path.join( getDesktop( ), 'a.orchestra' )

    fs.writeFileSync( pathToFile, orchestraFileString )

    console.log('Test RegExp compiled and saved as "a.orchestra" on desktop.')

// ────────────────────────────────────────────────────────────────────────────────
