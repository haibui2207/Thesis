FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app/Thesis

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /app/Thesis
COPY *.sln ./
COPY Thesis.API/*.csproj ./Thesis.API/
RUN dotnet restore

COPY . .

WORKDIR /app/Thesis/Thesis.API
RUN dotnet build -c Release -o /app/Thesis/api

FROM build AS publish
RUN dotnet publish Thesis.API.csproj -c Release -o /app/Thesis/api

FROM base AS final
WORKDIR /app/Thesis/api
COPY --from=publish /app/Thesis/api .
ENTRYPOINT ["dotnet", "Thesis.API.dll"]
