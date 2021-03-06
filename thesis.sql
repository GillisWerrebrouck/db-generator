PGDMP         #                v            thesis    9.6.6    9.6.6     `           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            a           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            b           1262    65599    thesis    DATABASE     �   CREATE DATABASE thesis WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Dutch_Belgium.1252' LC_CTYPE = 'Dutch_Belgium.1252';
    DROP DATABASE thesis;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            c           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    4                        3079    12387    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            d           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1                        3079    65621 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                  false    4            e           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                       false    2            �            1259    67141    address    TABLE     �   CREATE TABLE address (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    street text,
    number text,
    zipcode text,
    apartment text,
    city text,
    country text
);
    DROP TABLE public.address;
       public         postgres    false    2    4    4            �            1259    65600    user    TABLE       CREATE TABLE "user" (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    username text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    birthdate timestamp(6) without time zone NOT NULL,
    "addressId" uuid NOT NULL,
    biography text
);
    DROP TABLE public."user";
       public         postgres    false    2    4    4            ]          0    67141    address 
   TABLE DATA               Q   COPY address (id, street, number, zipcode, apartment, city, country) FROM stdin;
    public       postgres    false    187   x       \          0    65600    user 
   TABLE DATA               _   COPY "user" (id, username, firstname, lastname, birthdate, "addressId", biography) FROM stdin;
    public       postgres    false    186   �       �           2606    65641    user Users_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY "user"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 =   ALTER TABLE ONLY public."user" DROP CONSTRAINT "Users_pkey";
       public         postgres    false    186    186            �           2606    67155    address address_pkey 
   CONSTRAINT     K   ALTER TABLE ONLY address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.address DROP CONSTRAINT address_pkey;
       public         postgres    false    187    187            �           2606    67156    user user_addressId_fkey    FK CONSTRAINT     s   ALTER TABLE ONLY "user"
    ADD CONSTRAINT "user_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES address(id);
 F   ALTER TABLE ONLY public."user" DROP CONSTRAINT "user_addressId_fkey";
       public       postgres    false    186    187    2021            ]      x������ � �      \      x������ � �     