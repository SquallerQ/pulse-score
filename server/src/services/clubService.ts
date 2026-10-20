import { clubsByKey } from '../data/clubs';

type ClubReference = {
  clubKey?: string;
  clubName?: string;
};

export function getClubDetails(club: ClubReference, assetOrigin?: string) {
  const catalogClub = club.clubKey
    ? clubsByKey[club.clubKey]
    : Object.values(clubsByKey).find((item) => item?.name === club.clubName);
  const clubName = catalogClub?.name ?? club.clubName;

  if (!clubName) {
    throw new Error(`Missing club name for key: ${club.clubKey}`);
  }

  const crestUrl =
    assetOrigin && catalogClub?.crestFileName
      ? `${assetOrigin}/assets/club-crests/${catalogClub.crestFileName
          .split('/')
          .map((pathSegment) => encodeURIComponent(pathSegment))
          .join('/')}`
      : undefined;

  return {
    clubName,
    clubKey: catalogClub?.key ?? club.clubKey,
    crestUrl,
  };
}
