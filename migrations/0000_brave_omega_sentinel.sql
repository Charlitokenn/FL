CREATE TYPE "public"."approval_status" AS ENUM('APPROVED', 'REJECTED', 'PENDING');--> statement-breakpoint
CREATE TYPE "public"."contact_type" AS ENUM('CLIENT', 'LAND_SELLER', 'AUDITOR', 'ICT SUPPORT', 'STATIONERY', 'SURVEYOR');--> statement-breakpoint
CREATE TYPE "public"."districts" AS ENUM('Meru', 'Arusha City', 'Arusha', 'Karatu', 'Longido', 'Monduli', 'Ngorongoro', 'Ilala', 'Kinondoni', 'Temeke', 'Kigamboni', 'Ubungo', 'Bahi', 'Chamwino', 'Chemba', 'Dodoma', 'Kondoa', 'Kongwa', 'Mpwapwa', 'Bukombe', 'Chato', 'Geita Town', 'Mbogwe', 'Nyang’hwale', 'Iringa', 'Kilolo', 'Mafinga Town', 'Mufindi', 'Biharamulo', 'Bukoba', 'Bukoba', 'Karagwe', 'Kyerwa', 'Missenyi', 'Muleba', 'Ngara', 'Mlele', 'Mpanda', 'Mpanda Town', 'Buhigwe', 'Kakonko', 'Kasulu', 'Kasulu Town', 'Kibondo', 'Kigoma', 'Kigoma-Ujiji', 'Uvinza', 'Hai', 'Moshi', 'Moshi', 'Mwanga', 'Rombo', 'Same', 'Siha', 'Chake Chake', 'Mkoani', 'Kati', 'Kusini', 'Kilwa', 'Lindi', 'Lindi', 'Liwale', 'Nachingwea', 'Ruangwa', 'Babati Town', 'Babati', 'Hanang', 'Kiteto', 'Mbulu', 'Simanjiro', 'Bunda', 'Butiama', 'Musoma', 'Musoma', 'Rorya', 'Serengeti', 'Tarime', 'Busokelo', 'Chunya', 'Kyela', 'Mbarali', 'Mbeya City', 'Mbeya', 'Rungwe', 'Magharibi', 'Mjini', 'Gairo', 'Kilombero', 'Kilosa', 'Morogoro', 'Morogoro', 'Mvomero', 'Ulanga', 'Malinyi', 'Ifakara Township', 'Masasi', 'Masasi Town', 'Mtwara', 'Mtwara', 'Nanyumbu', 'Newala', 'Tandahimba', 'Ilemela', 'Kwimba', 'Magu', 'Misungwi', 'Nyamagana', 'Sengerema', 'Ukerewe', 'Ludewa', 'Makambako Town', 'Makete', 'Njombe', 'Njombe Town', 'Wanging’ombe', 'Bagamoyo', 'Kibaha', 'Kibaha Town', 'Kisarawe', 'Mafia', 'Mkuranga', 'Rufiji', 'Kalambo', 'Nkasi', 'Sumbawanga', 'Sumbawanga', 'Mbinga', 'Songea', 'Songea', 'Tunduru', 'Namtumbo', 'Nyasa', 'Kahama Town', 'Kahama', 'Kishapu', 'Shinyanga', 'Shinyanga', 'Bariadi', 'Busega', 'Itilima', 'Maswa', 'Meatu', 'Ikungi', 'Iramba', 'Manyoni', 'Mkalama', 'Singida', 'Singida', 'Ileje', 'Mbozi', 'Momba', 'Songwe', 'Igunga', 'Kaliua', 'Nzega', 'Sikonge', 'Tabora', 'Urambo', 'Uyui', 'Handeni', 'Handeni Town', 'Kilindi', 'Korogwe Town', 'Korogwe', 'Lushoto', 'Muheza', 'Mkinga', 'Pangani', 'Tanga City');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE');--> statement-breakpoint
CREATE TYPE "public"."id_type" AS ENUM('NATIONAL_ID', 'PASSPORT', 'DRIVER_LICENSE', 'VOTER_ID');--> statement-breakpoint
CREATE TYPE "public"."regions" AS ENUM('Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi', 'Kigoma', 'Kilimanjaro', 'Kusini Pemba', 'Kusini Unguja', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Mjini Magharibi Zanzibar', 'Morogoro', 'Mwanza', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga', 'Simiyu', 'Singida', 'Songwe', 'Tabora', 'Tabora', 'Tanga');--> statement-breakpoint
CREATE TYPE "public"."relationship" AS ENUM('PARENT', 'SIBLING', 'SPOUSE', 'FRIEND', 'OTHER');--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text,
	"mobile_number" text,
	"alt_mobile_number" text,
	"email" text,
	"gender" "gender",
	"contact_type" "contact_type" DEFAULT 'CLIENT',
	"id_type" "id_type",
	"id_number" text,
	"regions" "regions",
	"district" "districts",
	"ward" text,
	"street" text,
	"first_NOK_Name" text,
	"first_NOK_Mobile" text,
	"first_NOK_Relationship" "relationship",
	"second_NOK_Name" text,
	"second_NOK_Mobile" text,
	"second_NOK_Relationship" "relationship",
	"clientPhoto" text,
	"added_by" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "contacts_clientPhoto_unique" UNIQUE("clientPhoto")
);
