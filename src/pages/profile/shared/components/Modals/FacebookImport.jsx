import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withLoading from 'core/utils/loading';
import { Gallery, selectors } from 'core/modules/facebook-gallery';
import { withBulkImport } from '../../utils';

const Modal = ({ selection, onError, onClose, onImport }) => (
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">Add from Facebook</h4>
    </div>

    <div className="modal-body facebook-import">
      <Gallery onError={onError} />
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
  connect(selectors.getFacebookGallery),
  withBulkImport,
  withLoading(),
)(Modal);
