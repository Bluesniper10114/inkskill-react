import { describe, it } from 'mocha';
import { expect } from 'chai';
import { externalUrl, length } from './rules';

describe('core/modules/form/rules', () => {
  it('length', () => {
    const rule = length(3, 10);
    const valid = rule('test');
    const invalid1 = rule('t');
    const invalid2 = rule('test test test');

    expect(valid).to.equal(undefined);
    expect(invalid1).to.equal('Must be 3 characters or more');
    expect(invalid2).to.equal('Must be 10 characters or less');
  });

  it('externalUrl', () => {
    const valid = externalUrl('http://google.com');
    const invalid1 = externalUrl('http://localhost');
    const invalid2 = externalUrl('http://inkskill.com/about');

    expect(valid).to.equal(undefined);
    expect(invalid1).to.equal('Invalid URL');
    expect(invalid2).to.equal('InkSkill links are not allowed');
  });
});
