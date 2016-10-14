
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

declare module 'regulex' {

    //
    // ─── EXPORTS ────────────────────────────────────────────────────────────────────
    //

        function parse ( regex: string ): IRegExAST;

    //
    // ─── MAIN TREE ──────────────────────────────────────────────────────────────────
    //


        interface IRegExAST {
            raw: string;
            tree: IRegExASTNode[ ];
            groupCount: number;
        }

    //
    // ─── NODE ───────────────────────────────────────────────────────────────────────
    //


        interface IRegExASTNode {
            type: string;
            raw: string;
            chars?: string;
            ranges?: string[ ];
            repeat?: {
                min: number,
                max: number
            }
            branches?: IRegExASTNode[ ];
            indices: number[ ];
        }

    // ────────────────────────────────────────────────────────────────────────────────

}