
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

    // tools
    import * as repeats from '../generators/nodes/repeats';

    // nodes
    import * as exactNode from '../generators/nodes/exact'
    import * as charsetNode from '../generators/nodes/charset'

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    /** Compiles _Regulex AST_ into _Concerto AST_ */
    export function compile ( tree: blueprints.regulex.IBaseNode[ ] ) {
        /** This is where we store the AST at each level */
        let ast = [ ];

        // this handles each node
        for ( let node of tree )
            ast.push( handleOneNode( node ) );

        return ast;
    }

//
// ─── HANDLE ONE NODE ────────────────────────────────────────────────────────────
//

    function handleOneNode ( node: blueprints.regulex.IBaseNode ):
                                   blueprints.block.IBlock {
        // firs we handle the block
        let block;
        switch ( node.type ) {
            case 'exact':
                block = exactNode.generate( <blueprints.regulex.INodeExact> node )
                break

            case 'charset':
                block = charsetNode.generate( <blueprints.regulex.INodeSet> node )
                break
        }

        // then we handle the repeat of the block
        return repeats.generate( node, block );
    }

// ────────────────────────────────────────────────────────────────────────────────
