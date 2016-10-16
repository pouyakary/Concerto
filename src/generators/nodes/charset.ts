
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── GENERATOR ──────────────────────────────────────────────────────────────────
//

    export function generate ( node: blueprints.regulex.INodeSet ):
                                     blueprints.block.IBlock {

        // Simple Range
        if ( node.ranges.length === 1 && node.chars === '' )
            return composeRangeBlock( node.ranges[ 0 ] )

    }

//
// ─── RANGE SET BUILDER ──────────────────────────────────────────────────────────
//

    function composeRangeBlock ( range: string ): blueprints.block.IBlock {
        return {
            type: 'range',
            fields: [
                {  name: 'start',   value: range[ 0 ] },
                {  name: 'end',     value: range[ 1 ] }
            ]
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
