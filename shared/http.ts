import axios from 'axios';
import { PREFIX } from './api';

export const http = axios.create({
  baseURL: PREFIX,
  timeout: 10000,
});