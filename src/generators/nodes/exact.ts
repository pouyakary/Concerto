
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

    import * as genkit from '../genkit'
    import * as whitespaceNode from './whitespace'

//
// ─── GENERATOR ──────────────────────────────────────────────────────────────────
//

    export function generate ( node: blueprints.regulex.INodeExact
                                  ): blueprints.block.IIntermediateNode {

        console.log( node )

        // special space characters
        if ( node.chars.length === 1 ) {
            switch ( node.chars.charCodeAt( 0 ) ) {
                case 32:
                    return whitespaceNode.handleWhitespace( [ ' '  ], node )
                case 9:
                    return whitespaceNode.handleWhitespace( [ '\t' ], node )
                case 10:
                    return whitespaceNode.handleWhitespace( [ '\n' ], node )
            }}

        // else...
        return {
            type: 'block',
            node: node,
            value: [{
                type: 'encode',
                fields: [{
                    name: 'text',
                    value: genkit.encodeText( node.chars )
                }]
            }]
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
