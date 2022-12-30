import theme from '@/config/theme';
import { makeAutoObservable, observable } from 'mobx';

export class ThemeStore {
  theme = theme;

  constructor () {
    makeAutoObservable(this, {
      theme: observable,
    });
  }
}