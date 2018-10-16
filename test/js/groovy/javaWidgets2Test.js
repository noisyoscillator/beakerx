/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('Java widgets test ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaWidgets2Test.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('IntText widget ', function () {
    var widget;
    it('Cell has IntText widget ', function () {
      cellIndex = 0;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('input').getAttribute('type')).toEqual('number');
      expect(widget.$('input').getAttribute('step')).toEqual('1');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /55/);
      expect(widget.$('input').getValue()).toBe('55');
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /12345/);
      expect(widget.$('input').getValue()).toBe('12345');
    });

    it('Set description to "intText" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /intText/);
      expect(widget.$('label.widget-label').getText()).toBe('intText');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('FloatText widget ', function () {
    var widget;
    it('Cell has FloatText widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('input').getAttribute('type')).toEqual('number');
      expect(widget.$('input').getAttribute('step')).toEqual('any');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /11.1/);
      expect(widget.$('input').getValue()).toBe('11.1');
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /0.33/);
      expect(widget.$('input').getValue()).toBe('0.33');
    });

    it('Set description to "floatText" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /floatText/);
      expect(widget.$('label.widget-label').getText()).toBe('floatText');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

});