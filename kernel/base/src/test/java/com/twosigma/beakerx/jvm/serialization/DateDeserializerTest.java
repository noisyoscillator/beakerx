/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.jvm.serialization;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

public class DateDeserializerTest {

  private String json;
  private long timestamp;

  @Before
  public void setUp() throws Exception {
    timestamp = 1492423972082L;
    json = "{\"type\":\"Date\",\"timestamp\":"+ timestamp +"}";
  }

  @Test
  public void deserialize_resultObjectHasTimestamp() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(json);
    DateDeserializer deserializer = new DateDeserializer(new BasicObjectSerializer());
    //when
    Date date = (Date) deserializer.deserialize(actualObj, mapper);
    //then
    Assertions.assertThat(date).isNotNull();
    Assertions.assertThat(date.getTime()).isEqualTo(timestamp);
  }

}
