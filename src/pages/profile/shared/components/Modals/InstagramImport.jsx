import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withLoading from 'core/utils/loading';
import { AlbumPhotos } from 'core/modules/facebook-gallery';
import { getPhotos } from 'core/utils/social/instagram';
import { validateImage } from 'core/utils/images';
import { withBulkImport, withSelection } from '../../utils';

const Modal = ({
  selection,
  photos,
  toggleSelection,
  selectAll,
  clearAll,
  onClose,
  onImport,
}) => (
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">Add from Instagram</h4>
    </div>

    <div className="modal-body facebook-import">
      <AlbumPhotos
        photos={photos}
        selection={selection}
        toggleSelection={toggleSelection}
        selectAll={selectAll}
        clearAll={clearAll}
      />
    </div>

    <div className="modal-footer">
      <span className="text-left">{selection.length} photos selected</span>
      <div className="text-right">
        <button className="btn btn-default" onClick={onClose}>Cancel</button>
        <button
          className="btn btn-danger"
          disabled={!selection.length}
          onClick={onImport}
        >
          Import
        </button>
      </div>
    </div>
  </div>
);

export default compose(
  withState('loading', 'setLoading', false),
  withState('photos', 'setPhotos', []),
  withState('selection', 'setSelection', []),
  withSelection(({ photos }) => photos),
  withBulkImport,
  lifecycle({
    componentWillMount() {
      this.props.setLoading(true);
      getPhotos()
        .then((photos) => {
          this.props.setLoading(false);
          this.props.setPhotos(photos.map(p => Object.assign({}, p, {
            valid: validateImage(p.source),
            source: p.source.source,
          })));
        })
        .catch(this.props.onError);
    },
  }),
  withLoading(),
)(Modal);
