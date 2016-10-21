
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
// ─── GENERATORS ─────────────────────────────────────────────────────────────────
//

    export function generate ( intermediateNode: blueprints.block.IIntermediateNode ):
                                                 blueprints.block.IIntermediateNode {

        // No Repeat
        if ( intermediateNode.node.repeat === undefined ) return intermediateNode

        let min     = intermediateNode.node.repeat.min
        let max     = intermediateNode.node.repeat.max
        let block   = intermediateNode.value
        let result

        // Maybe block
        if ( min === 0 && max === 1 )
            result = composeStaticRepeat( 'maybe', block )

        // One or More
        else if ( min === 1 && max === Infinity )
            result = composeStaticRepeat( 'one_or_more', block )

        // Any number of
        else if ( min === 0 && max === Infinity )
            result = composeStaticRepeat( 'any_number_of', block )

        // Exact Repeat
        else if ( min === max )
            result = composeExactRepeat( min, block )

        // At least repeat
        else if ( max === Infinity )
            result = composeAtLeastRepeat( min, block )

        // Range Repeat
        else result = composeRangeRepeat( min, max, block )

        // done
        intermediateNode.value = result
        return intermediateNode
    }

//
// ─── COMPOSE MAYBE REPEAT ───────────────────────────────────────────────────────
//

    function composeStaticRepeat ( repeatType: string,
                                blockOrBlocks: blueprints.block.IBlock[ ] ):
                                               blueprints.block.IBlock {
        return {
            type: repeatType,
            children: [
                genkit.generateStatement( blockOrBlocks )
            ]}}

//
// ─── COMPOSE REPEAT TIMES ───────────────────────────────────────────────────────
//

    function composeExactRepeat ( count: number,
                          blockOrBlocks: blueprints.block.IBlock[ ] ):
                                         blueprints.block.IBlock {
        return {
            type: 'repeat',
            fields: [{
                name: 'count',
                value: count.toString( )
            }],
            children: [
                genkit.generateStatement( blockOrBlocks )
            ]}}

//
// ─── COMPOSE AT LEAST REPEAT ────────────────────────────────────────────────────
//

    function composeAtLeastRepeat ( min: number,
                          blockOrBlocks: blueprints.block.IBlock[ ] ):
                                         blueprints.block.IBlock {
        return {
            type: 'repeat_at_least',
            fields: [{
                name: 'count',
                value: min.toString( )
            }],
            children: [
                genkit.generateStatement( blockOrBlocks )
            ]}}

//
// ─── COMPOSE REPEAT IN RANGE ────────────────────────────────────────────────────
//

    function composeRangeRepeat ( min: number,
                                  max: number,
                        blockOrBlocks: blueprints.block.IBlock[ ] ):
                                       blueprints.block.IBlock {
        return {
            type: 'repeat_in_range',
            fields: [
                { name: 'start', value: min.toString( ) },
                { name: 'end',   value: max.toString( ) },
            ],
            children: [
                genkit.generateStatement( blockOrBlocks )
            ]}}

// ────────────────────────────────────────────────────────────────────────────────