const assert = require('chai').assert;
const router = require('../router');

const testAntiguedadIsNull = router.calcularDescuento(null, 320.45);
const testPrecioIsNull = router.calcularDescuento(4, null);
const testAntiguedadIsNullAndPrecioIsNull = router.calcularDescuento(null, null);

const testAntiguedadIsZero = router.calcularDescuento(0, 320.45);
const testPrecioIsZero = router.calcularDescuento(4, 0);
const testAntiguedadIsZeroAndPrecioIsZero = router.calcularDescuento(0, 0);

const testAntiguedadIsZeroAndPrecioIsNull = router.calcularDescuento(0, null);
const testAntiguedadIsNullAndPrecioIsZero = router.calcularDescuento(null, 0);

/** Porcentaje de descuento 
 * 0<antiguedad<=2   => 10%
 * 2<antiguedad<=5   => 20%
 * 5<antiguedad<=8   => 30%
 * 8<antiguedad<=10  => 40%
 * 10<antiguedad     => 50%
*/

const testAntiguedad2Years = router.calcularDescuento(2, 1000.00);
const testAntiguedad5Years = router.calcularDescuento(5, 1000.00);
const testAntiguedad8Years = router.calcularDescuento(8, 1000.00);
const testAntiguedad10Years = router.calcularDescuento(10, 1000.00);
const testAntiguedad15Years = router.calcularDescuento(15, 1000.00);

describe('Main Suite', function(){
    describe('Calcular Antiguedad Method - Test Cases', function(){
        it('Validate discount value of: testAntiguedadIsNull', function(){
            assert.equal(testAntiguedadIsNull, 0.00);
        });
        it('Validate discount value of: testPrecioIsNull', function(){
            assert.equal(testPrecioIsNull, 0.00);
        });
        it('Validate discount value of: testAntiguedadIsNullAndPrecioIsNull', function(){
            assert.equal(testAntiguedadIsNullAndPrecioIsNull, 0.00);
        });
        it('Validate discount value of: testAntiguedadIsZero', function(){
            assert.equal(testAntiguedadIsZero, 0.00);
        });
        it('Validate discount value of: testPrecioIsZero', function(){
            assert.equal(testPrecioIsZero, 0.00);
        });
        it('Validate discount value of: testAntiguedadIsZeroAndPrecioIsZero', function(){
            assert.equal(testAntiguedadIsZeroAndPrecioIsZero, 0.00);
        });
        it('Validate discount value of: testAntiguedadIsZeroAndPrecioIsNull', function(){
            assert.equal(testAntiguedadIsZeroAndPrecioIsNull, 0.00);
        });
        it('Validate discount value of: testAntiguedadIsNullAndPrecioIsZero', function(){
            assert.equal(testAntiguedadIsNullAndPrecioIsZero, 0.00);
        });

        it('Validate discount value of: testAntiguedad2Years', function(){
            assert.equal(testAntiguedad2Years, 100.00);
        });
        it('Validate discount value of: testAntiguedad5Years', function(){
            assert.equal(testAntiguedad5Years, 200.00);
        });
        it('Validate discount value of: testAntiguedad8Years', function(){
            assert.equal(testAntiguedad8Years, 300.00);
        });
        it('Validate discount value of: testAntiguedad10Years', function(){
            assert.equal(testAntiguedad10Years, 400.00);
        });
        it('Validate discount value of: testAntiguedad15Years', function(){
            assert.equal(testAntiguedad15Years, 500.00);
        });
        it('Validate discount data type', function(){
            assert.typeOf(testAntiguedad15Years, 'number', 'The expected data type is a number');
        });
    });
});