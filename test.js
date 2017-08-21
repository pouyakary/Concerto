
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
    const testRegExp = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g

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
