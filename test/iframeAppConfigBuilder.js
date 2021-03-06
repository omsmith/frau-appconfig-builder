import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'; 
import builder from '../lib/iframeAppConfigBuilder';
import stream from 'stream';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

const TARGET = 'example.com/path/app.js';
const OPTS = {
	version: '1.0.0.1',
	description: 'It is a small world',
	id: 'urn:d2l:fra:id:some-id'
};

describe('iframeAppConfigBuilder', () => {

	describe('build', () => {

		let coreBuilder;

		beforeEach( () => {
			coreBuilder = sinon.spy(require('../lib/appConfigBuilder'), 'build');
		});

		afterEach( () => {
			coreBuilder.restore();
		});

		it('should throw with no target', () => {
			expect(builder.build).to.throw('Missing target');
		});

		it('should pass opts to core builder', () => {
			builder.build(TARGET, OPTS);
			coreBuilder.should.have.been.calledWith(OPTS);
		});

		it('should create "loader" with schema and endpoint', () => {
			const val = builder.build(TARGET, OPTS);
			val.should.have.property('loader');
			val.loader.should.have.property('schema', 'http://apps.d2l.com/uiapps/iframeschema/v1.json' );
			val.loader.should.have.property('endpoint', TARGET );
		});

	});

	describe('buildStream', () => {

		it('should return a stream', () => {
			const val = builder.buildStream(TARGET, OPTS);
			val.should.instanceOf(stream.Stream);
		});

	});

});
