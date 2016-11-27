
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
    import * as repeats         from '../generators/nodes/repeats';

    // nodes
    import * as exactNode       from '../generators/nodes/exact'
    import * as charsetNode     from '../generators/nodes/charset'
    import * as groupNode       from '../generators/nodes/group'
    import * as choiceNode      from '../generators/nodes/choice'
    import * as lookaheadNode   from '../generators/nodes/lookahead'
    import * as assertNode      from '../generators/nodes/assert'
    import * as dotNode         from '../generators/nodes/dot'

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    /** Compiles _Regulex AST_ into _Concerto AST_ */
    export function compile ( tree: ( blueprints.regulex.IBaseNode | null )[ ] ) {
        let ast = new Array<blueprints.block.IBlock> ( )
        for ( let node of tree ) {
            if ( node !== null ) {
                let intermediateNode =  handleOneNode( node )
                if ( intermediateNode.type === 'block' )
                    ast.push( intermediateNode.value[ 0 ] )
                else
                    for ( let child of intermediateNode.value )
                        ast.push( child )
                    }}
        return ast
    }

//
// ─── HANDLE ONE NODE ────────────────────────────────────────────────────────────
//

    function handleOneNode ( node: blueprints.regulex.IBaseNode
                                ):  blueprints.block.IIntermediateNode {

        // firs we handle the block
        let intermediateNode
        switch ( node.type ) {
            case 'exact':
                intermediateNode =
                    exactNode.generate( node as blueprints.regulex.INodeExact );
                    break;

            case 'charset':
                intermediateNode =
                    charsetNode.generate( node as blueprints.regulex.INodeSet );
                    break;

            case 'group':
                intermediateNode =
                    groupNode.generate( node as blueprints.regulex.INodeGroup );
                    break;

            case 'choice':
                intermediateNode =
                    choiceNode.generate( node as blueprints.regulex.INodeChoice );
                    break;

            case 'dot':
                intermediateNode =
                    dotNode.generate( node );
                    break;

            case 'lookahead':
                intermediateNode =
                    lookaheadNode.generate( node as blueprints.regulex.INodeLookahead );
                    break;

            case 'assert':
                intermediateNode =
                    assertNode.generate( node as blueprints.regulex.INodeAssert );
                    break;
            }

        // then we handle the repeat of the block
        return repeats.generate( intermediateNode );
    }

// ────────────────────────────────────────────────────────────────────────────────
