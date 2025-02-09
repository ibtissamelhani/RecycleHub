import {Collection} from "../../models/collection";

export interface CollectionState {
  collections: Collection[];
  selectedCollection: Collection | null;
  loading: boolean;
  error: string | null;
}

export const initialCollectionState: CollectionState = {
  collections: [],
  selectedCollection: null,
  loading: false,
  error: null
};
