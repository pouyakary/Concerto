
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//


//
// ─── STATEMENT GENERATOR ────────────────────────────────────────────────────────
//

    export function generateStatement ( blocksOrBlocks: any, name = 'blocks' ):
                                        blueprints.block.IStatement {
        return {
            name: name,
            children: ( blocksOrBlocks.constructor === Array )?
                 blocksOrBlocks : [ blocksOrBlocks ]
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
