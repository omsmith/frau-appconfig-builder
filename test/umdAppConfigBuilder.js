import chai from 'chai';
import sinon from 'sinon'; 
import sinonChai from 'sinon-chai';
import builder from '../lib/umdAppConfigBuilder';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

const TARGET = 'example.com/path/app.js';
const OPTS = createValidOpts();

describe('umdAppConfigBuilder', () => {

	describe('build', () => {

		it('no target', () => {
			expect(builder.build).to.throw('Missing target');
		});

		it('should pass opts', () => {

			const coreBuilder = sinon.spy(require('../lib/appConfigBuilder'), 'build');

			builder.build(TARGET, OPTS);

			coreBuilder.should.have.been.calledWith(OPTS);

			coreBuilder.restore();

		});

		describe('loader', () => {

			it('should exist', () => {
				builder.build(TARGET, OPTS)
					.should.have.property('loader');
			});

			it('should have correct schema', () => {
				builder.build(TARGET, OPTS).loader
					.should.have.property('schema', 'http://apps.d2l.com/uiapps/umdschema/v1.json' );
			});

			it('should have correct endpoint', () => {
				builder.build(TARGET, OPTS).loader
					.should.have.property('endpoint', TARGET );
			});

			it('should have correct property showLoading', () => {
				builder.build(TARGET, OPTS).loader
					.should.have.property('showLoading', true);
			});

			it('should have property showLoading as false with OPTS undefined', () => {
				builder.build(TARGET, { id: createValidOpts().id }).loader
					.should.have.property('showLoading', false);
			});

		});
	});

});

function createValidOpts() {
	return {
		version: '1.0.0.1',
		description: 'It is a small world',
		id: 'urn:d2l:fra:id:some-id',
		showLoading: true
	};
}
