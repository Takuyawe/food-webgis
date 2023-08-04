import { styled } from "@mui/material/styles";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const YellowStar = styled(StarRateIcon)({
  color: "#fdd835",
});

const HalfStar = styled(StarHalfIcon)({
  color: "#fdd835",
});

const EmptyStar = styled(StarOutlineIcon)({
  color: "#fdd835",
});

const rountRating = (rating: number | undefined) => {
  if (!rating) return 0;
  const base = Math.floor(rating);
  const decimal = rating - base;

  if (decimal < 0.25) {
    return base;
  } else if (decimal < 0.75) {
    return base + 0.5;
  } else {
    return base + 1;
  }
};

export const getStars = (rating: number | undefined) => {
  if (!rating) return <div></div>;
  const roundedRating = rountRating(rating);
  let stars;
  switch (roundedRating) {
    case 0:
      stars = (
        <div>
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      );
      break;
    case 0.5:
      stars = (
        <div>
          <HalfStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      );
      break;
    case 1:
      stars = (
        <div>
          <YellowStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      );
      break;
    case 1.5:
      stars = (
        <div>
          <YellowStar />
          <HalfStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      );
      break;
    case 2:
      stars = (
        <div>
          <YellowStar />
          <YellowStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      );
      break;
    case 2.5:
      stars = (
        <div>
          <YellowStar />
          <YellowStar />
          <HalfStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      );
      break;
    case 3:
      stars = (
        <div>
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      );
      break;
    case 3.5:
      stars = (
        <div>
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <HalfStar />
          <EmptyStar />
        </div>
      );
      break;
    case 4:
      stars = (
        <div>
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <EmptyStar />
        </div>
      );
      break;
    case 4.5:
      stars = (
        <div>
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <HalfStar />
        </div>
      );
      break;
    case 5:
      stars = (
        <div>
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <YellowStar />
          <YellowStar />
        </div>
      );
      break;
    default:
      stars = (
        <div>
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      );
      break;
  }
  return stars;
};
