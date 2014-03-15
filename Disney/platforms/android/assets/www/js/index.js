/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


 $(document).on('pagebeforeshow', '#index', function(){ 
   console.log("index.js pagebeforeshow");
   $("#mk_button").click(function() {
     sessionStorage.setItem('park', 'mk');
     sessionStorage.setItem('parkUrl', 'magic-kingdom');
     sessionStorage.setItem('parkTitle', 'Magic Kingdom');
   });
     $("#ak_button").click(function() {
     sessionStorage.setItem('park', 'ak');
     sessionStorage.setItem('parkUrl', 'animal-kingdom');
     sessionStorage.setItem('parkTitle', 'Animal Kingdom');
   });
   $("#ep_button").click(function() {
     sessionStorage.setItem('park', 'ep');
     sessionStorage.setItem('parkUrl', 'epcot');
     sessionStorage.setItem('parkTitle', 'Epcot');
   });
   $("#hs_button").click(function() {
     sessionStorage.setItem('park', 'hs');
     sessionStorage.setItem('parkUrl', 'hollywood-studios');
     sessionStorage.setItem('parkTitle', 'Hollywood Studios');
   });

    $("#clearAll").click(function() {
     localStorage.clear();
     console.log("Cleared!");
   });
 });


