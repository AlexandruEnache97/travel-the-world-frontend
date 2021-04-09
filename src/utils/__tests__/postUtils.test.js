import calculateTimePassed from '../postUtils';

describe('Post utils tests', () => {
  it('Should test time passed', () => {
    expect(calculateTimePassed(new Date())).toEqual('A minute ago');
    expect(calculateTimePassed(new Date(Date.now() - 1.8 * 60 * 1000))).toEqual('2 minutes ago');
    expect(calculateTimePassed(new Date(Date.now() - 1.8 * 60 * 60 * 1000))).toEqual('2 hours ago');
    expect(calculateTimePassed(new Date(Date.now() - 1.8 * 60 * 60 * 24 * 1000))).toEqual('2 days ago');
  });
});
