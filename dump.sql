SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text,
    "userId" integer
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    "userId" integer,
    date date,
    description text,
    value numeric(12,2)
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, token, "userId") FROM stdin;
38	b33643de-e870-42b9-bd42-ff96ca320aea	5
39	83eef866-5c80-4dd9-9293-8c30f64ec2d9	5
40	86c9aafa-dd26-4201-a96d-c0515e3f50ac	5
41	da37db07-dda1-461d-9c73-66281630bd00	5
42	2ea018b1-8716-4ec7-a290-4c49298bab8e	5
43	85f1a8ee-4f5f-4c7f-8c99-cd3c2bee9cd7	5
44	3190e096-bc77-46de-86c9-8c5dddb84b52	5
45	88420139-8634-4c25-8574-155b4407ecd9	5
46	99e63494-562c-438e-926c-cb82d47fe0a9	5
47	696cd0ee-686d-4702-bd37-1503192c0577	5
48	789d1bad-0c31-4a91-bf34-37f41a06df60	5
49	e76c2541-f7c7-46b0-a5ee-c89a77fa78bc	5
50	928e16c4-2eca-44eb-8d26-b67a700f60f8	5
51	7b7d43aa-44da-4a10-b1e1-8ce043abb4a5	5
52	f728545c-cf19-4872-adc6-aad2eba262ac	5
53	2f403a0f-cc69-4dad-805f-84d27f080d9a	5
54	bb23b663-a986-43cd-ac64-0292c320b211	5
55	215412dd-c59e-4ff3-b6ae-595bd3835860	5
56	f5852563-bd14-4d9f-84c8-a5d276b6a7a1	5
57	a3ce4c63-3b4f-4115-bce3-b50e24194623	5
58	47a5c643-f676-45af-a6af-ec768ec62bf6	5
59	fe3d402f-aa66-48bc-b988-a814780bc0a5	5
60	9a4998bf-d3dc-4b7d-a63b-db7d6edeefdb	5
61	9095e41f-9fd5-4e85-9714-38b1ed12d0d9	5
62	6bd8248d-6d2f-4faf-ade5-b6e9e9ed46b8	5
63	39892b5f-8911-4b21-9365-ac2ab503de38	5
64	ef8e057e-4700-42ba-adaa-26322b9984b5	5
65	9590698e-d836-4aba-aec0-3af3d6f252d1	5
66	1fc592ca-b1e0-4bb0-a45a-d9fe3c7ba111	5
67	29f74af8-faf3-4d76-94a2-f9cae54e0003	5
68	e25bb58c-9c56-4d06-beed-e77c9ca6572d	5
69	8932a06c-345b-460a-be66-5a9a9ca24b98	5
70	c8a425aa-6d70-4104-9bd5-255dc1ec4ced	5
71	1f534cbb-b50e-4d34-9922-7a1bf30e8a6d	5
72	7ad1df4c-2c3b-45c8-9f32-9f589665f762	5
73	5af131fd-0cd9-4357-86b9-17ca3d3df975	5
74	d1abe2cf-bccc-41ab-ba1f-b3318227603a	5
75	38a796ba-1c32-4f49-a0f9-5068e4ef73e4	5
76	e70c35d6-e339-46b8-bc07-2dfe3859172a	5
77	ed65bda3-33a9-4109-b58f-69c1b814506e	5
82	8daa3b7c-c15a-4c8f-9e5b-d486e8b96f7e	5
83	b892f0f1-a1bf-4a72-8da2-a77dcafe2470	5
84	f6f2127e-34ea-4b42-9dfa-493542180638	5
90	3d2c77db-f393-43c8-95cf-674fecaec4f7	5
91	a2d3c99c-5774-4096-b40a-8a67f1c6fcef	5
92	74ce2c1e-dbb0-49fb-8401-0869f722ff36	5
94	239b6c5e-cf4e-4ea9-bd7d-4db9fdfbdc00	5
95	e6f310f4-490b-405e-ac82-f29b25e18ee3	11
96	eb15c1f0-75b2-4411-9e7c-46d85416b416	11
97	bf13707f-85f7-45cd-8209-e60bb76ecf87	11
98	b5a15174-f201-40f7-84b5-892c07180743	11
99	1ed81f42-0391-4a7c-b423-eb7630b1f942	11
100	13287114-bea7-4602-a56e-037b4a3ca3ea	11
101	2b48beed-baac-493e-8f14-e9bbd1388656	11
102	097b5dd2-a1ae-42f9-afab-8e02798a1437	11
103	03a45425-052d-4888-ae7e-3d069d22fa30	11
104	1a8e5c2e-685d-43f5-9223-d5d2d6c7c15b	11
105	1daa32ec-ea5c-4f02-83ba-341e98460587	11
106	65bcc8bf-1f5c-450b-b686-d695935ac12f	11
109	6e5c0966-2fbc-41af-95f6-32d4d7cd2530	11
110	14a036ec-65e0-41db-9847-eb8a0c3cf18c	11
111	356ee85f-8673-457d-a80f-b9d0187dd355	11
112	bca87b3d-9255-4ef1-be77-68a94659508d	11
113	43ce935c-7fe8-40f7-9646-220bbc73b4e9	11
114	02cb6ed3-e47b-43d7-9202-9c8cd16cdc9c	11
115	4be58ec2-e656-4921-94c8-779b9b89e101	11
116	a4eecfe2-35a8-48c4-aa65-3ab66be0b624	64
117	61a53085-19d7-4468-96e9-901c3ad02d2c	65
118	e8079f8f-d3e3-4603-8921-03f9281002b4	68
119	b7e3c797-de0e-4708-a8bc-4acb734aa33e	70
120	6313cb34-b3b1-4d1c-a1ed-3bb99e34a138	72
121	ae31a378-e9b1-4fd9-a6e0-6158b4c03981	73
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, "userId", date, description, value) FROM stdin;
24	5	2021-10-22	Salário	3000.00
25	5	2021-10-22	Compro GOW	-199.00
26	5	2021-10-22	GASTEI MUITO DINHEIRO POR AI	-1900.00
27	5	2021-10-22	Comprei um nescau caro	-90.00
28	5	2021-10-22	joguei no jogo do bixo	-10000.00
29	5	2021-10-22	33	-123.00
30	5	2021-10-22	33	123.00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	leandro	lester@email.com	$2b$10$W51fI6zy..RTPDGvGvtBieTcInxHwVRYm1xW1S4wk8UCjXxai9qKu
2	gutsy	gutsy@email.com	$2b$10$igxREpUMxdkRwxkji.jJM.ly32ozOHgXmWbo7pRaC0WNUlJyUXFsm
3	amigo	email@email.com	$2b$10$Y4sy0KC6E/RjH/Q4qVoVKOiHAPkKgcAAXPSpGsunPAI3AxkCz2/DS
4	lechero	lechero@email.com	$2b$10$zAJtfH7eTzXVtG3ygULky.KJ/g3HLsFWsozF5okm7oaQFaLzZL8yy
5	le	le@le.com	$2b$10$kFncWPyL4k9hxtxZ.aWLM.iCJ42WG1LLThy7uO2qFntXRNcvyBHOm
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 121, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 30, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 74, true);


--
-- PostgreSQL database dump complete
--

