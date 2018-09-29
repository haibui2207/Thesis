FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY Thesis.API/Thesis.API.csproj Thesis.API/
RUN dotnet restore Thesis.API/Thesis.API.csproj
COPY . .
WORKDIR /src/Thesis.API
RUN dotnet build Thesis.API.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Thesis.API.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Thesis.API.dll"]
