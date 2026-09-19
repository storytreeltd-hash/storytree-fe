export type Profile = {
  id: string;
  name: string;
  title: string;
  image: string;
  bioLeft: string[];
  bioRight: string[];
};

const steveGukasBio: Pick<Profile, "bioLeft" | "bioRight"> = {
  bioLeft: [
    "Steve Gukas is an award winning Producer-Director and the founder and CEO of Natives Filmworks, a creative independent production company. The company has developed and produced several feature films, documentary and TV series over the last 22 years.",
    "Steve's filmmaking career began with the production of Keeping Faith, (2000) which he Directed and Co-Produced. This project marked a major turning point for Nollywood Productions. It was followed by Namibia The Struggle For Liberation (2005), starring Danny Glover and Carl Lumbly, which he produced. The film premiered at the 2006 Pan African Film Festival in L.A. Steve went on to produce and direct A Place In The Stars (2014), winner Best Drama Film at the Africa Magic Viewer's Choice awards (2015).",
    "In 2015, Steve Directed and Co-Produced 93Days a feature film about the Ebola outbreak in Nigeria. The film premiered at the Toronto International Film Festival (TIFF 2016) and Has also screened at many other international film festivals. The film won several awards, including The Vision Award at the Pan African Film Festival L.A (2017), The Audience Choice Award at the Minneapolis/St. Paul International film Festival. This was followed by Producing Living In Bondage: Breaking Free, a sequel to the 1992 Nollywood industry defining film; Living In Bondage.",
  ],
  bioRight: [
    "Steve has spent the last 3 years mentoring and training the next generation of Nigerian film directors under the banner of the FirstFeatures project; a script-to-screen initiative. The end result, being the production of a twelve-film slate, with first time feature film Directors. All the films have been completed and acquired by PrimeVideo. With the initiative, Steve, set out to identify new and unique voices and empower them, to pursue bold and personal storytelling that reflects a wide range of human experience that are powerful, visceral and universal.",
    "Steve is a strong believer in the power of storytelling as the key to cultural memory and the promotion of tradition and identity. He currently has several projects in development and is set to begin principal photography on An African Love Story, set I Nigeria, South Africa, UK and Zambia. He is Directing and Co-Producing this project which he calls a love letter to the continent.",
  ],
};

export function createProfile(
  id: string,
  name: string,
  title: string,
  image = "/board.svg",
): Profile {
  return {
    id,
    name,
    title,
    image,
    ...steveGukasBio,
  };
}

export const placeholderProfiles = Array.from({ length: 8 }, (_, index) =>
  createProfile(`member-${index}`, "Charity Akuma", "Project Manager"),
);

export const advisoryBoardProfiles: Profile[] = [
  createProfile(
    "steve-gukas",
    "Steve Gukas",
    "Director, Producer",
    "/board/steve.png"
  ),
  createProfile(
    "nea-simone",
    "Nea Simone",
    "Web3 / Media Consultant",
    "/board/nea.png"
  ),
  createProfile(
    "emeka-mba",
    "Emeka Mba",
    "Media Executive",
    "/board/ebuka.png"
  ),
  createProfile(
    "john-demps",
    "John Demps",
    "Cinematographer",
    "/board/john.png"
  ),
  createProfile("ose-oyemadan", "Ose Oyemadan", "Producer", "/board/ose.png"),
  createProfile(
    "mayenzeke-baza",
    "Mayenzeke Baza",
    "Producer/Distributor",
    "/board/mayenzeke.png"
  ),
  createProfile(
    "dorothy-ghettuba",
    "Dorothy Ghettuba",
    "Film & TV Entrepreneur",
    "/board/dorothy.png"
  ),
  createProfile(
    "femi-kayode",
    "Femi Kayode",
    "Scriptwriter/Author",
    "/board/femi.png"
  ),
].map((profile) =>
  profile.id === "steve-gukas"
    ? profile
    : { ...profile, bioLeft: [], bioRight: [] }
);

export const ambassadorProfiles: Profile[] = [
  createProfile(
    "blitz-bazawule",
    "Blitz Bazawule",
    "Director",
    "/ambassadors/blitz.png"
  ),
  createProfile(
    "nancy-isime",
    "Nancy Isime",
    "Actor, Host",
    "/ambassadors/nancy.png"
  ),
  createProfile(
    "deyemi-okanlawon",
    "Deyemi Okanlawon",
    "Actor",
    "/ambassadors/deyemi.png"
  ),
  createProfile(
    "nomzamo-mbatha",
    "Nomzamo Mbatha",
    "Actor",
    "/ambassadors/nomzamo.png"
  ),
  createProfile(
    "lupita-nyongo",
    "Lupita Nyong'o",
    "Actress",
    "/ambassadors/lupita.png"
  ),
  createProfile("john-boyega", "John Boyega", "Actor", "/ambassadors/john.png"),
  createProfile(
    "hakeem-kae-kazim",
    "Hakeem Kae-Kazim",
    "Actor",
    "/ambassadors/hakeem.png"
  ),
  createProfile(
    "jackie-appiah",
    "Jackie Appiah",
    "Actor",
    "/ambassadors/jackie.png"
  ),
].map((profile) => ({ ...profile, bioLeft: [], bioRight: [] }));
