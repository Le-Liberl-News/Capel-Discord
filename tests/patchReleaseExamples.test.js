const test = require('node:test');
const assert = require('node:assert/strict');
const { textExample } = require('../utils/patchReleaseExamples');
test('changed words bold, safe Markdown, visible whitespace and bounded length', () => {
    const text = textExample({ file: 'scripts/test.json', key: 12, segments: [{text:'Bonjour ',changed:false},{text:'ami_*',changed:true}], removed:['monde'] });
    assert.ok(text.includes('Bonjour **ami\\_\\***'));
    assert.ok(text.includes('Retiré : **monde**'));
    assert.ok(textExample({file:'test',segments:[{text:'   ',changed:true}]}).includes('**␠␠␠**'));
    const long=textExample({file:'test',segments:[{text:'*'.repeat(20000),changed:true}],removed:['a'.repeat(10000)]});
    assert.ok(long.length<1900);
    assert.ok(long.includes('…'));
});
