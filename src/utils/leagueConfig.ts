import CLLogo from '../assets/icons/cl-logo-small.svg';
import PLLogo from '../assets/icons/epl-logo-small.svg';
import FL1Logo from '../assets/icons/fr-logo-small.svg';
import SALogo from '../assets/icons/seriea-logo-small.svg';
import LaLigaLogo from '../assets/icons/laliga-logo-small.svg';
import bundesligaLogo from '../assets/icons/bundesliga-logo-small.svg';

type LeagueConfig = {
  logo: string;
  className: string;
};

export const leagueConfig: Record<string, LeagueConfig> = {
  PL: { logo: PLLogo, className: 'dayContainerPL' },
  CL: { logo: CLLogo, className: 'dayContainerCL' },
  FL1: { logo: FL1Logo, className: 'dayContainerFL1' },
  SA: { logo: SALogo, className: 'dayContainerSA' },
  PD: { logo: LaLigaLogo, className: 'dayContainerPD' },
  BL1: { logo: bundesligaLogo, className: 'dayContainerBL1' },
};
