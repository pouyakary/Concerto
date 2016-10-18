
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
// ─── GENERATOR ──────────────────────────────────────────────────────────────────
//

    export function generate ( node: blueprints.regulex.INodeSet ):
                                     blueprints.block.IBlock {
        // Simple Range
        if ( node.ranges.length === 1 && node.chars === '' && node.exclude === undefined )
            return composeRangeBlock( node.ranges[ 0 ] , 'range' )

        // Check if simple set
        let simpleSet = true
        if ( node.ranges !== undefined )
            for ( let range of node.ranges )
                if ( !( range === 'az' || range === 'AZ' || range === '09' ) )
                    simpleSet = false

        // composing for simple set
        if ( simpleSet ) return composeSimpleAlphabetBlock( node )

        // composing for advanced set
        return composeAdvancedSet( node )
    }

//
// ─── RANGE SET BUILDER ──────────────────────────────────────────────────────────
//

    function composeRangeBlock ( range: string, kind: string ): blueprints.block.IBlock {
        return {
            type: kind,
            fields: [
                {  name: 'start', value: range[ 0 ] },
                {  name: 'end', value: range[ 1 ] }
            ]
        }
    }

//
// ─── SIMPLE ALPHABET BLOCK ──────────────────────────────────────────────────────
//

    function composeSimpleAlphabetBlock ( node: blueprints.regulex.INodeSet ):
                                                blueprints.block.IBlock {
        // fill ranges fields
        let sets = {
            numbers: 'FALSE',
            lowercase: 'FALSE',
            uppercase: 'FALSE',
        }
        if ( node.ranges !== undefined )
            for ( let range of node.ranges )
                switch ( range ) {
                    case '09':
                        sets.numbers = 'TRUE'
                        break
                    case 'az':
                        sets.lowercase = 'TRUE'
                        break
                    case 'AZ':
                        sets.uppercase = 'TRUE'
                        break
                    }

        // composing final stuff:
        return {
            type: ( node.exclude )? 'anything_but': 'alphabet',
            fields:[
                { name: 'numbers'    , value: sets.numbers     },
                { name: 'lowercase'  , value: sets.lowercase   },
                { name: 'uppercase'  , value: sets.uppercase   },
                { name: 'other'      , value: node.chars       },
            ]
        }
    }

//
// ─── ADVANCE SET ────────────────────────────────────────────────────────────────
//

    function composeAdvancedSet ( node: blueprints.regulex.INodeSet ):
                                        blueprints.block.IBlock {

        let children = new Array<blueprints.block.IBlock>( );

        // adding ranges
        for ( let range of node.ranges )
            children.push( composeRangeBlock( range, 'sigma_range' ) )

        // adding other chars
        if ( node.chars !== '' && node.chars !== undefined )
            children.push({
                type: 'sigma_chars',
                fields: [{
                    name: 'text', value: node.chars
                }]
            })

        // returning...
        return {
            type: ( node.exclude )? 'exclude': 'sigma',
            children: [
                genkit.generateStatement( children )
            ]}}

// ────────────────────────────────────────────────────────────────────────────────
