// SPDX-License-Identifier: Apache-2.0

// Shared error helpers live in the api layer; re-exported here so view code
// keeps its existing import paths without api/* depending on view/contracts/*.
export {
	assertNever,
	checked,
	jobChunk,
	jobStart,
	RpcError,
} from "../../api/common";
