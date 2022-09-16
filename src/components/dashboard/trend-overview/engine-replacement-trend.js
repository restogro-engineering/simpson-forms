/** @format */

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  ENG_DETAILS_STATE,
} from '../helper';

const PastEngineReplacementTrend = () => {
  return (
    <div className='past-engine-replacement-tend'>
      <div className='title'>ENGINE REPLACEMENT TREND</div>
      <div className='chart-container'>
        <ReactApexChart
          options={ENG_DETAILS_STATE.options}
          series={ENG_DETAILS_STATE.series}
          height={350}
        />
        <div className='eng-rep-summary-table'>
          <div className='st-row'>
            <div>YOY</div>
            <div>328</div>
            <div>234</div>
            <div>176</div>
            <div>241</div>
            <div>204</div>            
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>     
          <div className='st-row'>
            <div>2021-22</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>           
            <div>22</div>
            <div>9</div>
            <div>14</div>
            <div>27</div>
            <div>11</div>
            <div>13</div>
            <div>15</div>
            <div>21</div>
            <div>29</div>
            <div>10</div>
            <div>11</div>
            <div>22</div>
          </div>
          <div className='st-row'>
            <div>2020-21</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>           
            <div>8</div>
            <div>20</div>
            <div>21</div>
            <div>27</div>
            <div>17</div>
            <div>20</div>
            <div>13</div>
            <div>23</div>
            <div>32</div>
            <div>13</div>
            <div>19</div>
            <div>28</div>
          </div>
          <div className='st-row'>
            <div>2019-20</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>            
            <div>10</div>
            <div>19</div>
            <div>18</div>
            <div>22</div>
            <div>18</div>
            <div>14</div>
            <div>17</div>
            <div>10</div>
            <div>19</div>
            <div>9</div>
            <div>13</div>
            <div>7</div>
          </div>
          <div className='st-row'>
            <div>2018-19</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>            
            <div>35</div>
            <div>27</div>
            <div>26</div>
            <div>19</div>
            <div>11</div>
            <div>12</div>
            <div>30</div>
            <div>19</div>
            <div>19</div>
            <div>15</div>
            <div>11</div>
            <div>10</div>
          </div>
          <div className='st-row'>
            <div>2017-18</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>            
            <div>22</div>
            <div>30</div>
            <div>34</div>
            <div>32</div>
            <div>26</div>
            <div>28</div>
            <div>33</div>
            <div>40</div>
            <div>28</div>
            <div>18</div>
            <div>15</div>
            <div>23</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEngineReplacementTrend;
