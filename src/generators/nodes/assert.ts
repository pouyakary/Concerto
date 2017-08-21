
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

    import * as compiler from '../../compilers/level1'
    import * as genkit from '../genkit'

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

    export function generate ( node: blueprints.regulex.INodeAssert
                                  ): blueprints.block.IIntermediateNode {

        if ( node.assertionType === 'AssertWordBoundary' )
            return {
                type: 'block',
                node: node,
                value: [{
                    type: 'boundary'
                }]
            }

        if ( node.assertionType === 'AssertNonWordBoundary' )
            return {
                type: 'block',
                node: node,
                value: [{
                    type: 'anything_but_boundary'
                }]
            }

        if ( node.assertionType === 'AssertEnd' )
            return {
                type: 'block',
                node: node,
                value: [{
                    type: 'line_end'
                }]
            }

        if ( node.assertionType === 'AssertBegin' )
            return {
                type: 'block',
                node: node,
                value: [{
                    type: 'line_start'
                }]
            }

        if ( node.assertionType === 'AssertNegativeLookahead' )
            return {
                type: 'block',
                node: node,
                value: [{
                    type: 'lookahead',
                    fields: [
                        { name: 'status',  value: 'positive' }
                    ],
                    children: [
                        genkit.generateStatement( compiler.compile( node.sub ) )
                    ]
                }]
            }

        console.log( node )
        throw 'Undefined node found.'
    }

// ────────────────────────────────────────────────────────────────────────────────
