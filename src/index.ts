
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as regulex                     from 'regulex'
    import * as regulexToConcertoCompiler   from './compilers/level1'
    import * as concertoToRecarrCompiler    from './compilers/level2'
    import * as recarrToQuartetXMLCompiler  from './compilers/level3'

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    export function compile ( text: string, debug = false ) {
        // testing the regex we already have:
        let regulexAST: blueprints.regulex.IRegExAST
        try {
            regulexAST = regulex.parse( text )
        }
        catch ( error ) {
            throw error
        }

        if ( debug ) {
            console.log('--- Regulex AST --------------------------')
            console.log( regulexAST )
        }

        // first level compilation: Regulex AST to Concerto AST
        let concertoAST = regulexToConcertoCompiler.compile( regulexAST.tree )
        if ( debug ) {
            console.log('--- Concerto AST -------------------------')
            console.log( concertoAST )
        }

        // then we compile the concerto ast to recursive array ast
        let recarrAST = concertoToRecarrCompiler.compile( concertoAST )
        if ( debug ) {
            console.log('--- Concerto Recursive Array AST ---------')
            console.log( recarrAST )
        }

        // at the end we compile the recursive array into the Quartet XML
        let quartetXML = recarrToQuartetXMLCompiler.compile( recarrAST )
        if ( debug ) {
            console.log('--- Quartet Block XML --------------------')
            console.log( quartetXML )
        }

        // done!
        return quartetXML.replace( /\\"|"|\n/g, match => {
            if ( match === '"' )
                return '\\"'
            if ( match === '\n' )
                return ''
        });
    }

// ────────────────────────────────────────────────────────────────────────────────
