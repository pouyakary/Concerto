
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

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    export function compile ( text: string ) {
        // testing the regex we already have:
        let regulexAST: blueprints.regulex.IRegExAST
        try {
            regulexAST = regulex.parse( text )
        }
        catch ( error ) {
            throw error
        }

        // first level compilation: Regulex AST to Concerto AST
        let concertoAST = regulexToConcertoCompiler.compile( regulexAST.tree )
        console.log( concertoAST )

        // then we compile the concerto ast to recursive array ast
        let recarrAST = concertoToRecarrCompiler.compile( concertoAST )
        console.log( recarrAST )
    }

// ────────────────────────────────────────────────────────────────────────────────
