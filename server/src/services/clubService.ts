import { clubsByKey } from '../data/clubs';

type ClubReference = {
  clubKey?: string;
  clubName?: string;
};

export function getClubDetails(club: ClubReference, assetOrigin?: string) {
  const catalogClub = club.clubKey ? clubsByKey[club.clubKey] : undefined;
  const clubName = catalogClub?.name ?? club.clubName;

  if (!clubName) {
    throw new Error(`Missing club name for key: ${club.clubKey}`);
  }

  const crestUrl =
    assetOrigin && catalogClub?.crestFileName
      ? `${assetOrigin}/assets/club-crests/${encodeURIComponent(catalogClub.crestFileName)}`
      : undefined;

  return {
    clubName,
    clubKey: catalogClub?.key ?? club.clubKey,
    crestUrl,
  };
}
