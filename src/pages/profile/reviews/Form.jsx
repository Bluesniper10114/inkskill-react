import React from 'react';
import { Avatar, Spacer } from 'core/components';
import { TextArea, TextField } from 'core/modules/form';
import Rating from './Rating';
import Tags from './Tags';

const Form = ({
  profile,
  tags,
  data,
  errors,
  onChange,
  onSubmit,
}) => (
  <div className="comment-form">
    <div className="container">
      <div className="row">
        <div className="col-lg-9 col-lg-offset-3">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="inline-group">
                <Avatar user={profile} /> {' '}
                <form onSubmit={onSubmit}>
                  <TextField
                    name="title"
                    value={data.title}
                    error={errors.title}
                    placeholder="Title"
                    onChange={onChange}
                  />
                  <TextArea
                    name="description"
                    value={data.description}
                    error={errors.description}
                    placeholder="Description"
                    onChange={onChange}
                  />
                  <Tags
                    name="tags"
                    value={data.tags || []}
                    options={tags}
                    onChange={onChange}
                  />
                  <div className="row no-pads text-center text-left-md">
                    <div className="col-md-6">
                      <Spacer type="short" />
                      <Rating
                        name="stars"
                        value={data.stars}
                        onChange={onChange}
                        editing
                      />
                    </div>
                    <div className="col-md-6 text-center text-right-md">
                      <Spacer type="hidden-md hidden-lg" />
                      <button type="submit" className="btn btn-navi">Add Review</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Form;
