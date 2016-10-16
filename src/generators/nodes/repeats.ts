
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

    import * as genkit from '../genkit';

//
// ─── GENERATORS ─────────────────────────────────────────────────────────────────
//

    export function generate ( node: blueprints.regulex.IBaseNode,
                              block: blueprints.block.IBlock ):
                                     blueprints.block.IBlock {

        // No Repeat
        if ( node.repeat === undefined ) return block;

        let min = node.repeat.min;
        let max = node.repeat.max;

        // Maybe block
        if ( min === 0 && max === 1 )
            return composeStaticRepeat( 'maybe', block );

        // One or More
        if ( min === 1 && max === Infinity )
            return composeStaticRepeat( 'one_or_more', block );

        // Any number of
        if ( min === 0 && max === Infinity )
            return composeStaticRepeat( 'any_number_of', block );

        // Exact Repeat
        if ( min === max )
            return composeExactRepeat( min, block );

        // At least repeat
        if ( max === Infinity )
            return composeAtLeastRepeat( min, block );

        // Range Repeat
        return composeRangeRepeat( min, max, block );
    }

//
// ─── COMPOSE MAYBE REPEAT ───────────────────────────────────────────────────────
//

    function composeStaticRepeat ( repeatType: string,
                                blockOrBlocks: blueprints.block.IBlock ):
                                               blueprints.block.IBlock {
        return {
            type: repeatType,
            children: [
                genkit.generateStatement( blockOrBlocks )
            ]
        }
    }

//
// ─── COMPOSE REPEAT TIMES ───────────────────────────────────────────────────────
//

    function composeExactRepeat ( count: number,
                          blockOrBlocks: blueprints.block.IBlock ):
                                         blueprints.block.IBlock {
        return {
            type: 'repeat',
            fields: [{
                name: 'count',
                value: count.toString( )
            }],
            children: [
                genkit.generateStatement( blockOrBlocks )
            ]
        }
    }

//
// ─── COMPOSE AT LEAST REPEAT ────────────────────────────────────────────────────
//

    function composeAtLeastRepeat ( min: number,
                          blockOrBlocks: blueprints.block.IBlock ):
                                         blueprints.block.IBlock {
        return {
            type: 'repeat_at_least',
            fields: [{
                name: 'count',
                value: min.toString( )
            }],
            children: [
                genkit.generateStatement( blockOrBlocks )
            ]
        }
    }

//
// ─── COMPOSE REPEAT IN RANGE ────────────────────────────────────────────────────
//

    function composeRangeRepeat ( min: number,
                                  max: number,
                        blockOrBlocks: blueprints.block.IBlock ):
                                       blueprints.block.IBlock {
        return {
            type: 'repeat_in_range',
            fields: [
                { name: 'start', value: min.toString( ) },
                { name: 'end',   value: max.toString( ) },
            ],
            children: [
                genkit.generateStatement( blockOrBlocks )
            ]
        }
    }

// ────────────────────────────────────────────────────────────────────────────────