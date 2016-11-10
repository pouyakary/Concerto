
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

//
// ─── HANDLE WHITESPACE ──────────────────────────────────────────────────────────
//

    export function handleWhitespace ( spaces: string[ ],
                                         node: blueprints.regulex.INodeExact ):
                                               blueprints.block.IIntermediateNode {

        let settings = {
            space: false,
            tab: false,
            linefeed: false,
        }

        if ( isMember( '\t', spaces ) )
            settings.tab = true

        if ( isMember( ' ', spaces ) )
            settings.space = true

        if ( isMember( '\n', spaces ) )
            settings.linefeed = true

        return {
            type: 'block',
            node: node,
            value: [{
                type: 'whitespace',
                fields: generateFieldsArray( settings )
            }]}
    }

//
// ─── IS SUBSET ──────────────────────────────────────────────────────────────────
//

    function isMember ( element: any, arr: any[ ] ) {
        for ( let member of arr )
            if ( member === element )
                return true
        return false
    }

//
// ─── GENERATE FIELDS ────────────────────────────────────────────────────────────
//

    function generateFieldsArray ( spaces: Object ): blueprints.block.IField[ ] {
        let results = new Array<blueprints.block.IField> ( )
        for ( let space of Object.keys( spaces ) ) {
            results.push({
                name: space,
                value: ( spaces[ space ] )? 'TRUE' : 'FALSE'
            })
        }
        return results;
    }

// ────────────────────────────────────────────────────────────────────────────────
